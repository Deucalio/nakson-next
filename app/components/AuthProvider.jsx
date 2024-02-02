"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  // useEffect(() => {
  //   if (!user && pathname !== "/login") {
  //     router.push("/login");
  //   }
  //   console.log("pathname", pathname);
  // });

  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
