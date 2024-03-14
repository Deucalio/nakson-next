import { NextResponse } from "next/server";
import { inngest } from "../../inngest/client"; // Import our client

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

// Create a simple async Next.js API route handler
export async function GET(request) {
  // const serverURL = request.url.includes("localhost")
  //   ? "http://localhost:4000"
  //   : "https://nakson.services";\

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

  // Send your event payload to Inngest
  const res = await inngest.send({
    name: "test/hello.world",
    data: {
      s: "sad",
    },
  });
  return NextResponse.json({
    name: "Hello Inngest from Next!",
    ordersData: "sad",
  });
}
