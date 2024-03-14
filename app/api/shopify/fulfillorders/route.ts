import { NextResponse } from "next/server";
import { inngest } from "../../inngest/client"; // Import our client

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

// Create a simple async Next.js API route handler
export async function GET(request: { url: any; }) {
  const serverURL = request.url.includes("localhost") ? "http://localhost:3000" : "https://nakson.services";
  // Send your event payload to Inngest
  const res = await inngest.send({
    name: "test/hello.world",
    data: {
      email: "testFromNext@example.com",
    },
  });
  console.log("res: ", res)

  return NextResponse.json({ name: "Hello Inngest from Next!", serverURL });
}