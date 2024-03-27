import LEOPARDS_CITIES from "../../../esync/LEOPARDS_CITIES";

const bookLeopardsOrders = async (data) => {
  // Bulk Book Orders
  // Start the timer
  const start = new Date().getTime();
  // // End the timer

  const { orders, user, dbID, serverURL } = data;

  const userCourier = user.Courier.filter((acc) => acc.name === "Leopards");

  const userStores = user.stores;
  const shopifyStores = userStores.filter(
    (store) => store.store_info.platform === "shopify"
  );

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
  }
  let tracking_numbers = [];

  let booked_orders_details = [];
  for (let i = 0; i < orders.length; i++) {
    if (booked[orders[i].store_info.name] === undefined) {
      // console.log("Can't book these orders: ", orders[i].name);
      continue;
    }
    let {
      shipment_id,
      shipment_name: shipment_name_eng,
      shipment_email,
      shipment_phone,
      shipment_address,
    } = booked[orders[i].store_info.name].shipperInfo.response;

    let shipment_instructions =
      booked[orders[i].store_info.name].shipperInfo.specialInstructions;

    const order = orders[i];
    let bookedOrder = {
      booked_packet_weight: 100,
      booked_packet_no_piece: 1,
      booked_packet_collect_amount: Number(order.total_outstanding),
      booked_packet_order_id: order.name,
      origin_city: 475, // Hyderabad
      destination_city: Number(order.correct_city.id),
      shipment_id: String(shipment_id),
      shipment_name_eng: shipment_name_eng,
      shipment_email: shipment_email,
      shipment_phone: shipment_phone,
      shipment_address: shipment_address,
      consignment_name_eng:
        order.shipping_address.first_name +
        " " +
        order.shipping_address.last_name,
      consignment_phone: String(order.shipping_address.phone)
        ? String(order.shipping_address.phone)
        : "No Phone",
      consignment_address: `${order.shipping_address.address1} ${
        order.shipping_address.address2 ? order.shipping_address.address2 : ""
      }`,
      special_instructions: shipment_instructions,
      shipment_type: order.service_type,
    };
    booked[order.store_info.name]["orders"].push(bookedOrder);
  }
  const fulfillOrdersData = [];
  // Book orders for every store
  let counter = 0;
  for (const store in booked) {
    if (booked[store].orders.length === 0) {
      continue;
    }
    const api_key = booked[store].courierInfo.data.apiKey;
    const api_password = booked[store].courierInfo.data.password;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
      api_key: api_key,
      api_password: api_password,
      packets: booked[store].orders,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let response = "";
    try {
      // Send the request to Leopards API
      response = await fetch(
        "https://merchantapi.leopardscourier.com/api/batchBookPacket/format/json",
        requestOptions
      );
      response = await response.json();

      for (let i = 0; i < response.data.length; i++) {
        fulfillOrdersData.push({
          id: String(orders[counter].id),
          name: orders[counter].name,
          domain: orders[counter].store_info.domain,
          access_token: booked[orders[counter].store_info.name].accessToken,
          trackingNo: response.data[i].track_number,
        });

        tracking_numbers.push(response.data[i].track_number);
        const currentOrder = booked[store]["orders"][i];

        // For Slip
        booked_orders_details.push({
          shop_name: store,
          shop_logo: booked[store].shopLogo,
          service_type: currentOrder.shipment_type.toUpperCase(),
          courier: "Leopards",
          consignee_info: {
            name: currentOrder.consignment_name_eng,
            address: currentOrder.consignment_address.replace(/[\r\n]/gm, ""),
            phone: currentOrder.consignment_phone,
          },
          shipper_info: {
            name: booked[store].shipperInfo.response.shipment_name,
            address: booked[store].shipperInfo.response.shipment_address,
            phone: booked[store].shipperInfo.response.shipment_phone,
          },
          destination: orders[counter].correct_city,
          shipping_instructions: booked[store].shipperInfo.specialInstructions,
          date: new Date().toLocaleString().split(",")[0],
          pieces: currentOrder.booked_packet_no_piece,
          weight: currentOrder.booked_packet_weight,
          amount: currentOrder.booked_packet_collect_amount,
          track_number: response.data[i].track_number,
          booked_packet_order_name: response.data[i].booked_packet_order_id,
          collectType:
            currentOrder.booked_packet_collect_amount === 0
              ? "Non-COD Parcel"
              : "COD Parcel",
        });
        counter += 1;
      }
      console.log(
        `Booked Orders CN# for ${store}`,
        tracking_numbers.join(", ")
      );
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  const end = new Date().getTime();
  const timeTaken = (end - start) / 1000;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    id: dbID,
    email: user.email,
    data: {
      timeTaken: timeTaken,
      booked,
      slipData: booked_orders_details,
      ordersTrackingNumbers: tracking_numbers,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const backendRes = await fetch(
    `${serverURL}/leopards/save-temp-data`,
    requestOptions
  );

  const backendResult = await backendRes.json();
  console.log("backendResult: ", backendResult);

  return {
    booked_orders: booked_orders_details,
    fulfillOrdersData: fulfillOrdersData,
    timeTaken,
    dbID: dbID,
    booked,
  };
};

export { bookLeopardsOrders };
