import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "@/auth.config";
import { formSchema } from "@/schemas/login-schemas";
import { fetchUser } from "@/lib/data";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    // add user's id to session.user so we can access it later on
    // token is jwt token passed down from the jwt callback
    async session({ session, token }) {
      // console.log(token)
      // here, the default value for the jwt.sub is always the users id
      session.user.id = token.sub as string;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = formSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // check if user exists in db
          const user = await fetchUser(email);
          if (!user) return null;

          // check if user's password matches the one in db
          const passwordsMatch = await bcrypt.compare(password, user.password);
          // console.log(user);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
