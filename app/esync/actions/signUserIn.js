"use server";
import { auth, signIn, signOut } from "../../../auth";

const signUserIn = async (credential) => {
  await signIn("credentials", {
    email: credential.email,
    password: credential.password,
    // redirectTo: false,
    redirect: false,
  });
  return { success: true };
};

export { signUserIn };
