import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { authConfig } from "@/auth.config";
import { formSchema } from "@/schemas/login";
import { fetchUser } from "@lib/data";
import { createUserOauth, onSignIn } from "@/lib/auth/actions";
import { User } from "./lib/definitions";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // unpack config
  callbacks: {
    // add user's id to session.user so we can access it later on for db queries
    // @params token is jwt token passed down from the jwt callback
    // called whenever checking for an active session
    async session({ session, token }) {
      // console.log(token);
      // console.log(session);
      // here, the default value for the jwt.sub is always the users id
      const user = await fetchUser(token.email as string);
      session.user.id = user ? user.id : (token.sub as string);
      session.user.image = token.picture
      return session;
    },

    async signIn({ user, account }: any) {
      if (account.provider === "github" || "google") {
        // console.log(account);
        const userIfExists = await fetchUser(user.email);

        if (!userIfExists) {
          const newUser: User = {
            id: "", // random id we can cancel this out when adding to the db
            name: user.name,
            email: user.email,
            password: "", // nullable since oauth
            login_count: 0,
            last_logged_in: null,
            created_at: new Date(),
            provider: "github",
          };
          const message = await createUserOauth(newUser);
          return true;
        }
      } 
      return true; // or return a string if needed
    },
  },
  providers: [
    Google,
    GitHub,
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
          await onSignIn(user);
          console.log("USER SIGNED IN");
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
