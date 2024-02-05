import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "../../../prisma/generated/client";

export async function GET(request) {

  // if request is from localhost, we will return the server URL as localhost
  console.log("request", request.headers.get("host"));

  return Response.json({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL,
  });
}
