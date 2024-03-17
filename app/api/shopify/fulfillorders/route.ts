import { NextResponse } from "next/server";
import { inngest } from "../../inngest/client"; // Import our client

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

// Create a simple async Next.js API route handler
export async function GET(request) {
  //   {
  //     "id": "5753533137188",
  //     "name": "#MD4292",
  //     "domain": "momdaughts.myshopify.com",
  //     "access_token": "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",
  //     "trackingNo": "HD750135756"
  // }

  // const { ordersData } = await request.json();
  // console.log("ordersData: ", ordersData);
  // return NextResponse.json({ name: "Hello Inngest from Next!", ordersData });


  return NextResponse.json({
    name: "Hello Inngest from Next!",
  });
}
export async function POST(req, res) {
  const data = await req.json()
  const { ordersData } = data

  // // Send your event payload to Inngest
  await inngest.send({
    name: "test/fulfill.orders",
    // "domain": "quickstart-65d173cf.myshopify.com",
    // "access_token": "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",
    // "trackingNo": "HD12"
    data: { ordersData },
  });

  return NextResponse.json({ message: "Orders are being fulfilled!, stay Patient!" })
}
