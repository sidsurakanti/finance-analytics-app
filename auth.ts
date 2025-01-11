import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "@/auth.config";
import { formSchema } from "@/schemas/login";
import { fetchUser } from "@lib/data";
import { handleDbUpdatesOnLogin } from "@/lib/actions";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig, // unpack config
  callbacks: {
    // add user's id to session.user so we can access it later on for db queries
    // @params token is jwt token passed down from the jwt callback
    // called whenever checking for an active session
    async session({ session, token }) {
      // console.log(token);
      // console.log(session);
      // here, the default value for the jwt.sub is always the users id
      session.user.id = token.sub as string;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // parse credentials again on server side to avoid exposing sensitive data
        const parsedCredentials = formSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // check if user exists in db
          const user = await fetchUser(email);
          if (!user) return null;

          // check if user's password matches the one in db
          const passwordsMatch = await bcrypt.compare(password, user.password);

          // increment login count and last login date
          await handleDbUpdatesOnLogin(user.id);
          // console.log(user);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
