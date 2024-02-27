export const dynamic = "force-dynamic"; // defaults to auto
const axios = require("axios");

function getTimeStamp() {
  const localDate = new Date();
  // Get the Unix timestamp in seconds
  const timestampSeconds = localDate.getTime() / 1000;

  // Convert to milliseconds
  return timestampSeconds * 1000;
}

async function getSignature(code, timeStamp, params) {
  const res = await axios.post("https://esync-backend.vercel.app/api/sign", {
    secret: "sad",
    api: "/auth/token/create",
    parameters: params,
  });
  return res.data;
}

export async function GET(request) {
  // Get the query string
  // const code = request.url.split("?")[1].slice(5);
  console.log("cookie:" , request.headers.cookie);

 
  // const code = "4_501634_RQi2t4NkGOosxhvfKtWEay9l65";
  // const timeStamp = getTimeStamp();
  // const signature = getSignature();

  // const accessTokenUrl = `https://api.daraz.pk/rest/auth/token/create?code=${code}&app_key=501634&sign_method=sha256&timestamp=${timeStamp}&sign=E4C3B3D46B8FB7023D687BDCC7423B0953DE2287E2FD0C6E0A9435B09A325501`;

  // const res = await axios.post(accessTokenUrl);
  // console.log("accessTokenUrl: ", accessTokenUrl);
  // console.log("Response: ", res);

  return Response.json({
    message: "Hello from the API!",
  });
}
