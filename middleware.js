import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;
  // console.log("req", req.nextUrl.pathname);
  console.log("is", isLoggedIn);

  // If the user is not logged in, he can't visit any page except the login page or the signup page /register

  if (!isLoggedIn) {
    // if the user is not logged in he can still visit route route / and /portfolio
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/portfolio") {
      return NextResponse.next();
    }
    if (req.nextUrl.pathname.includes("/service")) {
      return NextResponse.next();
    }

    if (
      req.nextUrl.pathname !== "/esync/login" &&
      req.nextUrl.pathname !== "/esync/register"
    ) {
      return NextResponse.redirect(new URL("/esync/login", req.url));
    }
  }

  // If the user is logged in, he can't visit the login Page, so we will redirect him to the home page
  if (isLoggedIn) {
    if (req.nextUrl.pathname === "/esync/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // matcher: ["/esync"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
