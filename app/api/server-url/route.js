import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request) {
  // Return a JSON response with the server URL
  return Response.json({ serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL });
}
