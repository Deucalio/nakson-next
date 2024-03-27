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
    name: "test/leopards.orders",
    data: { user: user, orders: orders, serverURL: serverURL, dbID: dbID },
  });

  console.log("func", func, "dbID", dbID);

  return Response.json({
    message: `Leopards Orders are being Booked: ${dbID}`,
  });
}
