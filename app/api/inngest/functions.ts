import { inngest } from "./client";
import axios from "axios";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getFulfillmenOrderID = async (id, access_token, domain) => {

  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": access_token,
      },
    };

    const response = await fetch(`https://${domain}/admin/api/2023-10/orders/${id}/fulfillment_orders.json`, requestOptions);
    if (!response.ok) {
      console.log("network response error: ", response);
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    const fulfillmentOrderID = result.fulfillment_orders[0].id
    return fulfillmentOrderID;
  } catch (error) {
    console.error(`Could not get fulfullment ID of the order ${id}:`, error);
  }
}

const fulfillOrder = async (id, fulfillment_id, access_token, domain, trackingNo, url = "https://www.leopardscourier.com/leopards-tracking") => {

  const myHeaders = new Headers();
  myHeaders.append("X-Shopify-Access-Token", access_token);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "fulfillment": {
      "line_items_by_fulfillment_order": [
        {
          "fulfillment_order_id": fulfillment_id
        }
      ],
      "tracking_info": {
        "number": trackingNo,
        "url": url
      }
    }
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(`https://${domain}/admin/api/2023-04/fulfillments.json`, requestOptions);
    const result = await response.json();
    await sleep(1000);
    if (result.fulfillment) {
      if (result.fulfillment.status === "success") {
        return result.fulfillment.status;
      }
    } else {
      return "Order already fulfilled";
    }

  } catch (error) {
    console.error(`Couldn't fulfill Order ${id} `, error);
  }
}


export const fulfillOrders = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/fulfill.orders" },
  async ({ event, step }) => {
    const { ordersData } = event.data




    // Using Step.run to log the progress of the function
    const fulfillmentIDS = await step.run("fetch-fulfillment-order-ID", async () => {
      const ordersFullfillmentIDs: string[] = []; // Specify the type of the array as string[]

      for (let i = 1; i <= ordersData.length; i++) {

        // After 40 requests, wait for a minute
        if (i % 40 === 0) {
          await sleep(60000);
          console.log("Sleeping for 60 seconds");
        }
        const order = ordersData[i - 1];
        const fulfillmentID = await getFulfillmenOrderID(order.id, order.access_token, order.domain)
        ordersFullfillmentIDs.push(fulfillmentID)
      }
      return ordersFullfillmentIDs
    })

    const fulfilledOrders = await step.run("fulfill-orders", async () => {
      const fulfilledOrdersData: any[][] = [];

      for (let i = 1; i <= ordersData.length; i++) {
        const order = ordersData[i - 1];
        const fulfillment = await fulfillOrder(order.id, fulfillmentIDS[i - 1], order.access_token, order.domain, order.trackingNo)
        fulfilledOrdersData.push([order.name, fulfillment, order.trackingNo]); // Convert the array to a string using the join() method
      }
      return fulfilledOrdersData
    })

    console.log("fulfilledOrders: ", fulfilledOrders);
    return 1;






    // for (let i = 1; i <= ordersData.length; i++) {
    //   const order = ordersData[i - 1];
    //   // const fulfillmentID = await getFulfillmenOrderID(order.id, order.access_token, order.domain)
    //   // const fulfillment = await fulfillOrder(order.id, fulfillmentID, order.access_token, order.domain, order.trackingNo)
    //   // if (i % 40 === 0) {
    //   //   // Wait for a minute after every 40 requests
    //   //   await sleep(60000);
    //   //   console.log("Sleeping for 60 seconds");
    //   // }

    //   fulfilledOrdersData.push([order.name, "Eww", order.trackingNo]); // Convert the array to a string using the join() method
    // }
    // console.log("fulfilledOrdersData: ", fulfilledOrdersData);
    // return fulfilledOrdersData



    // return { event, fulfilledOrders: fulfilledOrders, totalOrders: ordersData.length };
  });