import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "../../../../prisma/generated/client";
import { inngest } from "../../inngest/client"; // Import our client


export async function GET(request) {
  return Response.json({
    message: "Hello There!",
  });
}

export async function POST(request) {
  // if request is from localhost, we will return the server URL as localhost
  // but if the request is from the production server, we will return the server URL as the production server
  const { email, orders, serverURL, dbID } = await request.json();

  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      stores: true,
      Courier: true,
    },
  });

  const func = await inngest.send({
    name: "test/tcsbook.orders",
    // "domain": "quickstart-65d173cf.myshopify.com",
    // "access_token": "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",
    // "trackingNo": "HD12"
    data: { user: user, orders: orders, serverURL: serverURL, dbID: dbID },
  });

  console.log("func", func, "dbID", dbID);

  return Response.json({
    message: `Orders are being Booked: ${dbID}`,
  });
}
