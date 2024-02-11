import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";

// export auth object from next auth
export default NextAuth(authConfig).auth;

export const config = {
  // ! doesn't ignore files in public route
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
