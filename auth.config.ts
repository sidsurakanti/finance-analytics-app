import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  // set pages for signIn
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    // run callback everytime middleware is run (basically, every time a page is accessed and matches middleware regex)
    // ^ @see middleware.ts
    authorized({ request, auth }) {
      // check if user can access requested page
      const url = request.nextUrl;
      // * make sure to add any routes that aren't protected later on
      // ? is it possible to handle this with middleware
      const unprotectedRoutes = ["/", "/login", "/register"];

      const isLoggedIn = !!auth?.user;
      const isOnProtected = !unprotectedRoutes.includes(url.pathname);

      // redirect if not logged in, else proceed
      if (isOnProtected) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", url));
      }

      return NextResponse.next();
    },
  },
} satisfies NextAuthConfig;
