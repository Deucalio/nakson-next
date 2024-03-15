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
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    const fulfillmentOrderID = result.fulfillment_orders[0].id
    return fulfillmentOrderID;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
}



export const fulfillOrders = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/fulfill.orders" },
  async ({ event, step }) => {
    const { ordersData } = event.data

    const fulfilledOrders = await step.run("fulfill-order", async () => {

      for (let i = 1; i <= ordersData.length; i++) {
        const order = ordersData[i - 1];
        const fulfillmentID = await getFulfillmenOrderID(order.id, order.access_token, order.domain)
        console.log(`Order fulfillmentID: ${i} `, fulfillmentID);
      }
      return ordersData
    })


    return { event, fulfilledOrders: fulfilledOrders, totalOrders: ordersData.length };
  });