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
  const skus = [{}];

  for (const store of stores) {
    const response = await axios.get(
      `https://${store.store_info.shop}/admin/api/2023-10/orders.json?status=any&limit=50`,
      {
        headers: {
          "X-Shopify-Access-Token": store.store_info.accessToken,
        },
      }
    );

    const orders = response.data.orders;
    console.log("orders: ", orders.length);
    orders.forEach((order, index) => {
      for (const product of order.line_items) {
        if (product.sku === "" || product.sku === null) {
          continue;
        }
        skus.forEach((sku) => {
          if (sku[product.sku]) {
            sku[product.sku] += product.quantity;
          } else {
            sku[product.sku] = product.quantity;
          }
        });
      }
    });
  }
  let Skus = Object.keys(skus[0]);
  let Count = Object.values(skus[0]);

  console.log("Skus: ", Skus);
  console.log("Count: ", Count);

  let d = [];
  for (let i = 0; i < 37; i++) {
    d.push(`${Skus[i]},${Count[i]}`);
  }

  return Response.json({
    data: d.join("/"),
    skus: skus,
  });
}
