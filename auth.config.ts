import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Credentials from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/prisma";
import { signInSchema } from "./lib/formSchema";
import { compare } from "bcryptjs";
import { sendVerificationRequest } from "./lib/authSendRequest";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string;
            image?: string;
        };
        accessToken?: string;
    }
}

export const authConfig = {
    adapter: PrismaAdapter(db),
    providers: [
        Resend({
            apiKey: process.env.RESEND_API_KEY,
            from: process.env.EMAIL_FROM,
            sendVerificationRequest,
        }),
        Github({
            clientId: process.env.AUTH_GITHUB_CLIENT_ID!,
            clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
        }),
        Twitter({
            clientId: process.env.AUTH_TWITTER_ID!,
            clientSecret: process.env.AUTH_TWITTER_SECRET!,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const validatedFields = signInSchema.safeParse(credentials);
                if (!validatedFields.success) {
                    return null;
                }
                const { email, password } = validatedFields.data;
                const user = await db.user.findUnique({ where: { email } });
                if (!user) {
                    return null;
                }
                if (!user.emailVerified) {

                    return null;
                }
                const isPasswordMatch = await compare(password, user.password);
                if (!isPasswordMatch) {
                    return null;
                }
                // Return user object 
                return {
                    id: user.id,
                    email: user.email,
                    name: user.firstName,
                    image: user.image,
                };
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {

            if (account?.type === "oauth" && user?.email) {
                const existingUser = await db.user.findUnique({
                    where: { email: user.email },
                });

                if (existingUser) {
                    // Check if account is already linked
                    const linkedAccount = await db.account.findFirst({
                        where: {
                            userId: existingUser.id,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                        },
                    });

                    if (!linkedAccount) {
                        // Link the new OAuth account to the existing user
                        await db.account.create({
                            data: {
                                userId: existingUser.id,
                                type: account.type,
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                                access_token: account.access_token,
                                token_type: account.token_type,
                                id_token: account.id_token,
                                refresh_token: account.refresh_token,
                                expires_at: account.expires_at,
                                scope: account.scope,
                                session_state: account.session_state
                                    ? String(account.session_state)
                                    : null,

                            },
                        });
                    }
                    user.id = existingUser.id;
                }
            }
            // Optionally, handle unverified email for credentials
            if (account?.provider === "credentials" && user && user.email) {
                const dbUser = await db.user.findUnique({ where: { email: user.email } });
                if (dbUser && !dbUser.emailVerified) {
                    // Optionally redirect or show an error
                    return false;
                }
            }
            return true;
        },

        async session({ session, user, token }) {
            // Optionally attach user id or accessToken to session
            if (token && session.user) {
                session.user.id = token.sub as string;
                if (token.accessToken) session.accessToken = token.accessToken as string;
            }
            return session;
        },

        async jwt({ token, user, account }) {
            // Optionally persist accessToken to the token
            if (account && user) {
                token.accessToken = account.access_token;
                token.sub = user.id;
            }
            return token;
        },
    },

    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        verifyRequest: "/verify-email",
        // error: "/error",
    },
} satisfies NextAuthConfig;
