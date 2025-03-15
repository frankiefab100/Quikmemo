import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import { signInSchema } from "./lib/formSchema"
import { compare } from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { db } from "./lib/prisma"

export const authConfig = {
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
            async authorize(credentials) {
                const validatedFields = signInSchema.safeParse(credentials);
                if (!validatedFields.success) {
                    return null;
                }

                // Validate that the user exists
                const { email, password } = validatedFields.data;
                const user = await db.user.findUnique({
                    where: { email },
                });
                if (!user) {
                    return null;
                }

                const isPasswordMatch = await compare(password, user.password);
                if (!isPasswordMatch) {
                    return null;
                }
                return user;
            },
        }),
    ],
} satisfies NextAuthConfig

