import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "../../../prisma/generated/client";

export async function GET(request) {
  // if request is from localhost, we will return the server URL as localhost
  // but if the request is from the production server, we will return the server URL as the production server

  if (request.headers.get("host").includes("localhost")) {
    return Response.json({
      serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    });
  }
  return Response.json({
    serverURL: process.env.SERVER_URL,
  });
}
