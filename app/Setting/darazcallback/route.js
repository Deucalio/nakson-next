export const dynamic = "force-dynamic"; // defaults to auto
const crypto = require("crypto");
const axios = require("axios");

function getTimeStamp() {
  const localDate = new Date();
  // Get the Unix timestamp in seconds
  const timestampSeconds = localDate.getTime() / 1000;

  // Convert to milliseconds
  return timestampSeconds * 1000;
}

function generateSignature(timeStamp, code) {
  console.log("Code: ", code);
  const concatenatedString = `/auth/token/createapp_key501634code${code}sign_methodsha256timestamp${timeStamp}`;

  // Create an HMAC_SHA256 digest
  const hmac = crypto.createHmac("sha256", "X1BBDAi3EuamELmOZi400PLT1xxhxrOw"); // daraz secret key
  hmac.update(concatenatedString, "utf-8");
  const digest = hmac.digest("hex");
  return digest;
}

export async function GET(request) {
  // Get the query string
  const code = request.url.split("?")[1].slice(5);
  const timeStamp = getTimeStamp();
  const signature = generateSignature(timeStamp, code);

  const accessTokenUrl = `https://api.daraz.pk/rest/auth/token/create?code=${code}&app_key=501634&sign_method=sha256&timestamp=${timeStamp}&sign=${signature}`;

  const res = await axios.post(accessTokenUrl);
  console.log("accessTokenUrl: ", accessTokenUrl);
  console.log("Response: ", res);

  return Response.json({
    message: "Hello from the API!",
  });
}
