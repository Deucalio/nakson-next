export const dynamic = "force-dynamic"; // defaults to auto
const axios = require("axios");

function getTimeStamp() {
  const localDate = new Date();
  // Get the Unix timestamp in seconds
  const timestampSeconds = localDate.getTime() / 1000;

  // Convert to milliseconds
  return timestampSeconds * 1000;
}

function generateSignature(code) {
  console.log("Code: ", code);
  const timeStamp = getTimeStamp();
  const concatenatedString = `/auth/token/createapp_key501634&sign_methodsha256&timestamp${timeStamp}code${code}`;

  // Create an HMAC_SHA256 digest
  const hmac = crypto.createHmac("sha256", "X1BBDAi3EuamELmOZi400PLT1xxhxrOw"); // Replace 'your_secret_key_here' with your actual secret key
  hmac.update(concatenatedString, "utf-8");
  const digest = hmac.digest("hex");
  return digest
}

export async function GET(request) {
  // Get the query string
  const code = request.url.split("?")[1].slice(5);
  const timeStamp = getTimeStamp();
  const signature = generateSignature(code);
  
  console.log("Signature: ", signature);

  const accessTokenUrl = `https://api.daraz.pk/rest/auth/token/create?code=${code}&app_key=501634&sign_method=sha256&timestamp=1708871094016&sign=0DD1520DB058949CC9F993EE3E0DBFEA6B07A488AD81B52F64EEE72FEDD558A5`;

  return Response.json({
    message: "Hello from the API!",
  });
}

export async function POST(request) {
  return Response.json({
    message: "That is a POST REQUEST",
  });
}
