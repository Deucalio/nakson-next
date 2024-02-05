import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "../../../prisma/generated/client";

export async function GET(request) {
  return Response.json({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL,
  });
}
