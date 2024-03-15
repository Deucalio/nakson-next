import { inngest } from "./client";
import axios from "axios";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function createOrder(numberOfOrders) {
  const data = {
    order: {
      financial_status: "pending",
      line_items: [
        {
          title: "Green Gummy Gums",
          price: 750.99,
          grams: "1300",
          quantity: 3,
          tax_lines: [
            {
              price: 73.5,
              rate: 0.06,
              title: "State tax",
            },
          ],
        },
      ],
      total_tax: 13.5,
      currency: "EUR",
    },
  };

  // const config = {
  //   headers: {
  //     "X-Shopify-Access-Token": "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",
  //     "Content-Type": "application/json",
  //   },
  // };
  const config = {
    method: 'POST',
    headers: {
      "X-Shopify-Access-Token": "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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };


  for (let i = 1; i <= numberOfOrders; i++) {
    try {
      const response = await fetch(
        "https://quickstart-65d173cf.myshopify.com/admin/api/2024-01/orders.json",
        config
      );
      // const response = await axios.post(
      //   "https://quickstart-65d173cf.myshopify.com/admin/api/2024-01/orders.json",
      //   data,
      //   config
      // );
      const json = await response.json();
      console.log(`Order Created: ${i} `, json.order.name);
      // console.log("Hello")
      if (i % 4 === 0) {
        if (i === numberOfOrders) {
          return;
        }
        console.log("Waiting for a minute");
        // Wait for a minute before sending the next request
        await sleep(60000);
      }
    } catch (error) {
      console.error(`Request ${i + 1} failed:`, error);
    }
  }
}
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // await step.sleep("wait-a-moment", "1s");

    await step.run("send-welcome-email", async () => {
      await createOrder(8);
    });


    // // create 8 orders of shopify
    // createOrder(8).then((res) => {
    //   console.log("Orders created");
    // });

    // const res = await axios.get(`${serverURL}/kewl`);
    // console.log("res: ", res.data);
    return { event, body: "Sad" };
  }
);
