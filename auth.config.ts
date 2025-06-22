import { type NextAuthConfig } from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { signInSchema } from "./lib/formSchema"
import { compare } from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { db } from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const authConfig = {
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                // console.log("Authorize function started...");
                const validatedFields = signInSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    // console.log(`Attempting to authorize user: ${email}`);

                    const user = await db.user.findUnique({ where: { email } });
                    if (!user || !user.password) {
                        // console.log("Authorization failed: User not found or no password set.");
                        return null;
                    }

                    const passwordsMatch = await compare(password, user.password);
                    if (passwordsMatch) {
                        // console.log(`Authorization successful for user: ${email}`);
                        return user;
                    }
                }
                // console.log("Authorization failed: Invalid credentials or validation error.");
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
        async signIn({ user, account, profile }) {
            // console.log(`Sign-in callback triggered for user: ${user.email}, provider: ${account?.provider}`);

            if (account?.provider === "google") {
                if (profile?.email_verified) {
                    // Update image if changed
                    if (profile?.picture) {
                        if (user.email) {
                            const dbUser = await db.user.findUnique({ where: { email: user.email } });
                            if (dbUser && dbUser.image !== profile.picture) {
                                await db.user.update({
                                    where: { email: user.email },
                                    data: { image: profile.picture },
                                });
                            }
                        }

                    }
                    return true;
                }
                // console.log("Google sign-in blocked: email not verified by Google.");
                return false; // Block sign-in
            }

            // Allow other OAuth providers like GitHub without this specific check
            if (account?.provider !== "credentials") {
                return true;
            }

            // For "credentials" provider, check our database by email instead of id
            if (user.email) {
                const existingUser = await db.user.findUnique({ where: { email: user.email } });
                if (!existingUser?.emailVerified) {
                    // console.log(`Sign-in blocked for ${user.email}: Email not verified in DB.`);
                    return false;
                }
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) { // This block is only triggered on sign-in
                const dbUser = await db.user.findUnique({ where: { id: user.id } });
                if (dbUser) {
                    token.id = dbUser.id;
                    token.name = `${dbUser.firstName} ${dbUser.lastName}`;
                    token.picture = dbUser.image;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.image = token.picture as string | null;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/error",
    },
} satisfies NextAuthConfig