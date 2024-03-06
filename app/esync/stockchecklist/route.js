import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
const axios = require("axios");
import { PrismaClient } from "../../../prisma/generated/client";

export async function GET(request) {
  const shopInfo = [{}];
  // Get the user's shopify store
  const res = await axios.post(
    "https://esync-backend.vercel.app/shopify/get-stores",
    {
      email: "subhankhanyz@gmail.com",
    }
  );

  const stores = await res.data.stores;

  const orders = [];

  const skus = {};

  for (const store of stores) {
    if (store.name === "Deepsea Life Sciences") {
      console.log("Skipping ", store.name);
      continue;
    }
    const response = await axios.get(
      // `https://${store.store_info.shop}/admin/api/2023-10/orders.json?status=any&limit=50`,
      `https://${store.store_info.shop}/admin/api/2023-10/orders.json?status=open&financial_status=unpaid&limit=50&fulfillment_status=unfulfilled`,
      {
        headers: {
          "X-Shopify-Access-Token": store.store_info.accessToken,
        },
      }
    );
    let resOrders = response.data.orders;
    resOrders = resOrders.filter((order) =>
      order.tags.toLowerCase().includes("call confirmed")
    );
    console.log("resOrders: ", resOrders.length);
    orders.push(...resOrders);
  }

  for (const order of orders) {
    for (const product of order.line_items) {
      if (product.sku === "" || product.sku === null) {
        continue;
      }
      if (skus[product.sku]) {
        skus[product.sku] += product.quantity;
      } else {
        skus[product.sku] = product.quantity;
      }
    }
  }

  console.log("skus: ", skus);

  let Skus = Object.keys(skus);
  let Count = Object.values(skus);

  let d = [];
  for (let i = 0; i < Skus.length; i++) {
    d.push(`${Skus[i]},${Count[i]}`);
  }

  // return Response.send(d.join("/"));
  return new Response(
    `
    ${d.join("/")}
    `,
    { status: 200, headers: { "content-type": "text/html" } }
  );

  // return Response.json({
  //   data: d.join("/"),
  //   skus: skus,
  // });
}
