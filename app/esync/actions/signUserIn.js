"use server";
import { auth, signIn, signOut } from "../../../auth";
import axios from "axios";

const signUserIn = async (credential) => {
  await signIn("credentials", {
    email: credential.email,
    password: credential.password,
  });
};

export { signUserIn };
