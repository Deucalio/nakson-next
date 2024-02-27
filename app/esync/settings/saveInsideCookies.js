"use server";
import { cookies } from "next/headers";

const saveInsideCookies = (userInfo) => {
  cookies().set("userInfo", JSON.stringify(userInfo), { secure: true });
};

export { saveInsideCookies };
