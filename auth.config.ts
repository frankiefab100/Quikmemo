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
        Twitter({
            clientId: process.env.AUTH_TWITTER_ID,
            clientSecret: process.env.AUTH_TWITTER_SECRET,
        }),

        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Validate input
                const validatedFields = signInSchema.safeParse(credentials);
                if (!validatedFields.success) {
                    throw new CredentialsSignin("Invalid credentials");
                }
                const { email, password } = validatedFields.data;

                // Find user
                const user = await db.user.findUnique({ where: { email } });
                if (!user) {
                    throw new CredentialsSignin("Invalid credentials");
                }

                // Check if email is verified
                if (!user.emailVerified) {
                    throw new CredentialsSignin("Please verify your email before logging in.");
                }

                // Check password
                const isPasswordMatch = await compare(password, user.password);
                if (!isPasswordMatch) {
                    throw new CredentialsSignin("Invalid credentials");
                }

                // Return user object (only required fields)
                return {
                    id: user.id,
                    email: user.email,
                    name: user.firstName,
                    image: user.image,
                };
            },
        }),
        // Credentials({
        //     async authorize(credentials) {
        //         const validatedFields = signInSchema.safeParse(credentials)
        //         if (!validatedFields.success) {
        //             return null
        //         }

        //         const { email, password } = validatedFields.data
        //         const user = await db.user.findUnique({
        //             where: { email },
        //         })
        //         if (!user) {
        //             return null
        //         }

        //         // Check if email is verified for credentials login
        //         if (!user.emailVerified) {
        //             throw new Error("Please verify your email before signing in")
        //         }

        //         const isPasswordMatch = await compare(password, user.password)
        //         if (!isPasswordMatch) {
        //             return null
        //         }
        //         return user
        //     },
        // }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Allow credentials login only if email is verified
            if (account?.provider === "credentials") {
                const existingUser = await db.user.findUnique({
                    where: { email: user.email! },
                })
                return !!existingUser?.emailVerified
            }

            // Handle OAuth providers
            if (account?.provider && user.email) {
                const existingUser = await db.user.findUnique({
                    where: { email: user.email },
                })

                if (existingUser) {
                    // Check if this OAuth account is already linked
                    const existingAccount = await db.account.findUnique({
                        where: {
                            provider_providerAccountId: {
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                            },
                        },
                    })

                    if (!existingAccount) {
                        // Link the OAuth account to the existing user
                        await db.account.create({
                            data: {
                                userId: existingUser.id,
                                type: account.type,
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                                refresh_token: account.refresh_token,
                                access_token: account.access_token,
                                expires_at: account.expires_at,
                                token_type: account.token_type,
                                scope: account.scope,
                                id_token: account.id_token,
                                session_state: account.session_state
                                    ? String(account.session_state)
                                    : null,
                            },
                        })
                    }

                    // Mark email as verified for OAuth users
                    if (!existingUser.emailVerified) {
                        await db.user.update({
                            where: { id: existingUser.id },
                            data: { emailVerified: new Date() },
                        })
                    }

                    return true
                }

                // Create new user for OAuth if no existing user
                return true
            }

            return true
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
        error: "/error",
    },
} satisfies NextAuthConfig
