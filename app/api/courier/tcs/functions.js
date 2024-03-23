import TCS_CITIES from "../../../esync/TCS_CITIES";

const bookTCSOrders = async (data) => {
  const ordersTrackingNumbers = [];

  // Start the timer
  const start = new Date().getTime();
  // // End the timer

  const { orders, user, dbID, serverURL } = data;
  console.log("Orders: ", orders.length);

  const userCourier = user.Courier.filter((acc) => acc.name === "TCS");

  const userStores = user.stores;
  const shopifyStores = userStores.filter(
    (store) => store.store_info.platform === "shopify"
  );

  let booked_orders_details = [];

  let booked = {
    // Store Orders and their courierID
    // store_1: {orders: [], courierID: 1, shipperInfo: {}, shopLogo: "url", accessToken, domain   },
    // store_2: {orders: [], courierID: 2, shipperInfo: {}, shopLogo: "url"  accessToken, domain   },
  };
  for (const store of shopifyStores) {
    const courierInfo = userCourier.find(
      (courier) =>
        courier.shippers.find((shipper) => shipper.shop === store.name) || null
    );
    if (!courierInfo) {
      console.log(
        "No courier found, so orders can't be booked for store: ",
        store.name
      );
      continue;
    }
    booked[store.name] = {
      orders: [],
      courierInfo: courierInfo,
      shipperInfo: courierInfo.shippers.find(
        (shipper) => shipper.shop === store.name
      ),
      shopLogo: store.image_url,
      accessToken: store.store_info.accessToken,
      domain: store.store_info.shop,
    };
    booked[store.name].originCityCode = TCS_CITIES.find(
      (city) =>
        city.cityName ===
        booked[store.name].shipperInfo.response.costCenterCityName
    ).cityCode;
  }

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    if (booked[order.store_info.name] === undefined) {
      // console.log("Can't book these orders: ", orders[i].name);
      continue;
    }
    let { userName, password } = booked[order.store_info.name].courierInfo.data;
    let { specialInstructions: remarks } =
      booked[order.store_info.name].shipperInfo;

    let {
      costCenterName,
      costCenterCode,
      costCenterCityName: originCityName,
      pickupAddress,
      contactNumber,
    } = booked[order.store_info.name].shipperInfo.response;
    let services = "";
    if (order.service_type === "Express") {
      services = "O";
    } else if (order.service_type === "Economy-Express") {
      services = "D";
    } else if (order.service_type === "Overland") {
      services = "OLE";
    }

    let productDetails = "";
    // Append the product titles to productDetails
    for (const item of order.line_items) {
      productDetails += item.title + ", ";
    }

    let consigneeName = `${order.shipping_address.first_name} ${order.shipping_address.last_name}`;
    let consigneeAddress = `${order.shipping_address.address1} ${
      order.shipping_address.address2 ? order.shipping_address.address2 : ""
    }`;
    let consigneeMobNo = `${order.shipping_address.phone}`;

    // To send to TCS API for booking orders
    let bookedOrder = {
      userName,
      password,
      costCenterCode,
      consigneeName,
      consigneeAddress,
      consigneeMobNo,
      consigneeEmail: `${order.email || "Fake@nakson.services"}`,
      originCityName,
      destinationCityName: `${order.correct_city.cityName}`,
      weight: 0.5,
      pieces: 1,
      codAmount: `${order.total_outstanding}`,
      customerReferenceNo: `${order.name}`,
      services,
      productDetails,
      fragile: "YES",
      remarks,
      insuranceValue: 1,
    };
    booked[order.store_info.name]["orders"].push(bookedOrder);

    // For Slip
    booked_orders_details.push({
      shop_name: order.store_info.name,
      shop_logo: order.store_info.shopLogo,
      service_type: order.service_type.toUpperCase(),
      origin_city: {
        name: originCityName,
        city_code: booked[order.store_info.name].originCityCode,
      },
      courier: "TCS",
      consignee_info: {
        name: consigneeName,
        address: consigneeAddress.replace(/[\r\n]/gm, ""),
        phone: consigneeMobNo,
      },
      shipper_info: {
        name: costCenterName,
        address: pickupAddress,
        phone: contactNumber,
      },
      destination: {
        name: order.correct_city.cityName,
        city_code: order.correct_city.cityCode,
      },
      shipping_instructions: remarks,
      date: new Date().toLocaleString().split(",")[0],
      pieces: 1,
      weight: 0.5,
      amount: `${Number(order.total_outstanding)}`,
      track_number: "Not Booked Yet",
      booked_packet_order_name: order.name,
      collectType:
        Number(order.total_outstanding) === 0 ? "Non-COD Parcel" : "COD Parcel",
    });
  }
  // Book the Orders using TCS API
  let counter = 0;
  for (const store in booked) {
    const storeOrders = booked[store].orders;

    for (let i = 0; i < storeOrders.length; i++) {
      const order = storeOrders[i];
      let response = "";
      try {
        // Send the request to TCS API
        const myHeaders = new Headers();
        myHeaders.append("X-IBM-Client-Id", process.env.TCS_CLIENTID);
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify(order);
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        response = await fetch(
          "https://api.tcscourier.com/production/v1/cod/create-order",
          requestOptions
        );
        response = await response.json();

        // response = await axios.post(
        //   "https://api.tcscourier.com/production/v1/cod/create-order",
        //   order,
        //   {
        //     headers: {
        //       "X-IBM-Client-Id": process.env.TCS_CLIENTID,
        //     },
        //   }
        // );
        if (response.returnStatus.status === "FAIL") {
          console.log(
            `Could not Book Order: ${order.customerReferenceNo} `,
            response.data
          );
          continue;
        }
        let result = response.bookingReply.result;
        let cn = result.slice(result.indexOf(":") + 2);
        ordersTrackingNumbers.push({
          consignmentNumber: cn,
          userName: booked[store].courierInfo.data.userName,
          password: booked[store].courierInfo.data.password,
        });

        // console.log(
        //   "CN: ",
        //   cn,
        //   "Order Name: ",
        //   booked_orders_details[counter].booked_packet_order_name
        // );
        booked_orders_details[counter].track_number = cn;
        counter += 1;
      } catch (e) {
        console.log("Could not Book Order: ", e);
      }
    }
  }

  const end = new Date().getTime();
  const timeTaken = (end - start) / 1000;

  //   Send the data to backend

  const backendRes = await fetch(`${serverURL}/tcs/save-temp-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: dbID,
      email: user.email,
      data: {
        timeTaken: timeTaken,
        booked,
        slipData: booked_orders_details,
        ordersTrackingNumbers: ordersTrackingNumbers,
      },
    }),
  });

  const { message: backendMsg } = await backendRes.json();
  console.log("Backend Response: ", backendMsg);

  return {
    timeTaken: timeTaken,
    booked,
    booked_orders: booked_orders_details,
    ordersTrackingNumbers: ordersTrackingNumbers,
    dbID: dbID,
  };
};

export { bookTCSOrders };
