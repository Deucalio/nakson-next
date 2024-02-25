export const dynamic = "force-dynamic"; // defaults to auto
const axios = require("axios");

export async function GET(request) {
  // Get the query string
  console.log("request: ", request.url);

  return Response.json({
    message: "Hello from the API!",
  });
}

export async function POST(request) {
  console.log("Post Request: ", request.url);
  return Response.json({
    message: "That is a POST REQUEST",
  });
}
