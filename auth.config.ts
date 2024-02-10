import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  // set default pages
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    // run callback everytime middleware is run
    // manage user authorization to access page
    authorized({ request, auth }) {
      const url = request.nextUrl;
      // * make sure to add any routes that aren't protected
      // ? is it possible to handle this with middleware
      const unprotectedRoutes = ["/", "/login", "/register"];

      const isLoggedIn = !!auth?.user;
      const isOnProtected = !unprotectedRoutes.includes(url.pathname);

      if (isOnProtected) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", url));
      } else {
        return NextResponse.next();
      }
    },
  },
} satisfies NextAuthConfig;
