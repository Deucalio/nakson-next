export async function GET() {

  return Response.json({ data: process.env.SERVER_URL });
}
