export const dynamic = "force-dynamic"; // defaults to auto
const axios = require("axios");
import { cookies } from "next/headers";
import { getUser } from "../../esync/actions/getUser";

function getTimeStamp() {
  const localDate = new Date();
  // Get the Unix timestamp in seconds
  const timestampSeconds = localDate.getTime() / 1000;

  // Convert to milliseconds
  return timestampSeconds * 1000;
}

async function getAccessToken(
  signature,
  code,
  timeStamp,
  app_key,
  name,
  email,
  currentUserEmail
) {
  const res = await axios.post(
    "https://esync-backend.vercel.app/daraz/access-token",
    {
      signature,
      code,
      timeStamp,
      app_key,
      name,
      email,
      userEmail: currentUserEmail,
    }
  );
  return res.data;
}

async function getSignature(secret, api, params) {
  const res = await axios.post("https://esync-backend.vercel.app/daraz/sign", {
    secret,
    api,
    parameters: params,
  });
  return res.data;
}

export async function GET(request) {
  // Get the query string
  const code = request.url.split("?")[1].slice(5);
  const { name, email } = JSON.parse(cookies().get("userInfo").value);
  const app_key = "501634";
  const app_secret = "X1BBDAi3EuamELmOZi400PLT1xxhxrOw";
  const correntUser = await getUser();

  const timeStamp = getTimeStamp();
  const signature = await getSignature(app_secret, "/auth/token/create", {
    app_key,
    code,
    sign_method: "sha256",
    timestamp: timeStamp,
  });

  const darazRes = await getAccessToken(
    signature,
    code,
    timeStamp,
    app_key,
    name,
    email,
    correntUser.user.email
  );

  return Response.json({
    message: darazRes.message,
  });
}
