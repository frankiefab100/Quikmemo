import { CredentialsSignin, type NextAuthConfig } from "next-auth"
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
        Credentials({
            async authorize(credentials) {
                const validatedFields = signInSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await db.user.findUnique({ where: { email } });
                    if (!user || !user.password) return null;

                    const passwordsMatch = await compare(password, user.password);
                    if (passwordsMatch) return user;
                }
                return null;
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            // It's crucial to find the user from the database again to get the latest state
            const existingUser = await db.user.findUnique({ where: { id: user.id } });

            // Prevent sign-in if email is not verified for credentials provider
            if (!existingUser?.emailVerified) {
                return false;
            }

            // TODO: Add 2FA check if you implement it in the future

            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id as string
            }
            return session
        },
    },
    pages: {
        signIn: "/login",
        error: "/error", // This page will handle errors like AccessDenied
    },
} satisfies NextAuthConfig