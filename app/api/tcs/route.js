import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "../../../prisma/generated/client";

export async function GET(request) {
  // if request is from localhost, we will return the server URL as localhost
  // but if the request is from the production server, we will return the server URL as the production server
  const prisma = new PrismaClient();

  const user = await prisma.user.findMany();
  console.log("user", user);

  return Response.json({
    user,
  });
}
