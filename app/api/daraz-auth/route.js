export const dynamic = "force-dynamic"; // defaults to auto
const axios = require("axios");

export async function GET(request) {
  // Get the query string
  console.log("request: ",request.url)
  

  return Response.json({
    message: "Hello from the API!",
  });
}
