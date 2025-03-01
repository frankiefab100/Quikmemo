import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import { db } from "./prisma";
import { saltAndHashPassword } from "@/utils/helpers";
import bcrypt from "bcryptjs";
// import { PrismaAdapter } from "@auth/prisma-adapter";


export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },

  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
    Twitter({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      // async authorize(credentials) {
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
            // return null;
          }

          const email = credentials?.email as string;
          const hash = saltAndHashPassword(credentials.password as string)
          let user = await db.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) {
            user = await db.user.create({
              data: {
                email,
                hashedPassword: hash,
              },
            });
          } else {
            const isMatch = bcrypt.compareSync(credentials.password as string, user.hashedPassword as string);
            if (!isMatch) {
              throw new Error("Incorrect password");
            }
          }

          return user

        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/error",
  },
});