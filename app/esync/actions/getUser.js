"use server";
import { auth } from "../../../auth";

async function getUser() {
  const data = await auth();
  return data;
}
export { getUser };
