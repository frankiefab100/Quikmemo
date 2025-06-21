import { CredentialsSignin, type NextAuthConfig } from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
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
                console.log("Authorize function started...");
                const validatedFields = signInSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    console.log(`Attempting to authorize user: ${email}`);

                    const user = await db.user.findUnique({ where: { email } });
                    if (!user || !user.password) {
                        console.log("Authorization failed: User not found or no password set.");
                        return null;
                    }

                    const passwordsMatch = await compare(password, user.password);
                    if (passwordsMatch) {
                        console.log(`Authorization successful for user: ${email}`);
                        return user;
                    }
                }
                console.log("Authorization failed: Invalid credentials or validation error.");
                return null;
            }
        }),
    ],
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log(`Sign-in callback triggered for user: ${user.email}, provider: ${account?.provider}`);
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") {
                console.log("OAuth sign-in allowed.");
                return true;
            }

            const existingUser = await db.user.findUnique({ where: { id: user.id } });

            if (!existingUser?.emailVerified) {
                console.log(`Sign-in blocked for ${user.email}: Email not verified.`);
                return false;
            }

            console.log(`Sign-in successful for verified user: ${user.email}`);
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
        error: "/error",
    },
} satisfies NextAuthConfig