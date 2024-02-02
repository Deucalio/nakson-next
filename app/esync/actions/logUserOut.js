"use server";
import { auth, signIn, signOut } from "../../../auth";

async function logUserOut() {
  return await signOut();
}
export { logUserOut };
