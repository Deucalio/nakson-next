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

  // Send your event payload to Inngest
  await inngest.send({
    name: "test/fulfill.orders",
    // "domain": "quickstart-65d173cf.myshopify.com",
    // "access_token": "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",
    // "trackingNo": "HD12"
    data: {
      ordersData:
        [
          {
            id: "5653655486664",
            name: "#1428",
            domain: "quickstart-65d173cf.myshopify.com",
            access_token: "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",
            trackingNo: "HD120"
          },
          {
            "id": "5653655453896",
            "name": "#1427",
            "domain": "quickstart-65d173cf.myshopify.com",
            "access_token": "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",
            "trackingNo": "HD121"
          },
          {
            "id": "5653655388360",
            "name": "#1426",
            "domain": "quickstart-65d173cf.myshopify.com",
            "access_token": "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",
            "trackingNo": "HD122"
          },
          {
            "id": "5653655355592",
            "name": "#1425",
            "domain": "quickstart-65d173cf.myshopify.com",
            "access_token": "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",
            "trackingNo": "HD123"
          },
          {
            "id": "5653654569160",
            "name": "#1424",
            "domain": "quickstart-65d173cf.myshopify.com",
            "access_token": "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",
            "trackingNo": "HD124"
          },
          {
            "id": "5653654536392",
            "name": "#1423",
            "domain": "quickstart-65d173cf.myshopify.com",
            "access_token": "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",
            "trackingNo": "HD125"
          },
          {
            "id": "5653654503624",
            "name": "#1422",
            "domain": "quickstart-65d173cf.myshopify.com",
            "access_token": "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",
            "trackingNo": "HD126"
          },
          {
            "id": "5653654470856",
            "name": "#1421",
            "domain": "quickstart-65d173cf.myshopify.com",
            "access_token": "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",
            "trackingNo": "HD127"
          }
        ],
    },
  });
  return NextResponse.json({
    name: "Hello Inngest from Next!",
  });
}
