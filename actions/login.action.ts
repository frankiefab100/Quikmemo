"use server";
import { signIn } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { signInSchema, type SignInValues } from "@/lib/formSchema";
import { AuthError } from "next-auth";
import { createVerificationToken } from "@/actions/verification.action";
import { sendVerificationEmail } from "@/lib/email";

export const login = async (values: SignInValues) => {
    const validatedFields = signInSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields provided." };
    }

    const { email, password } = validatedFields.data;

    // Database pre-checks
    try {
        const existingUser = await db.user.findUnique({ where: { email } });

        if (!existingUser || !existingUser.password) {
            return { error: "Invalid credentials." };
        }

        if (!existingUser.emailVerified) {
            const verificationToken = await createVerificationToken(existingUser.email);
            await sendVerificationEmail(
                verificationToken.email,
                verificationToken.token,
                existingUser.firstName
            );
            return { success: "Confirmation email sent!" };
        }
    } catch (error) {
        console.error("Database error during login pre-check:", error);
        return { error: "Database error. Please try again." };
    }

    // Attempt to sign in
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials." };
                default:
                    return { error: "An unexpected authentication error occurred." };
            }
        }
        throw error;
    }
}; 