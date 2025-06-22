"use server";
import { db } from "@/lib/prisma";
import { signUpSchema, type SignUpValues } from "@/lib/formSchema";
import { hashSync } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { createVerificationToken } from "@/actions/verification.action";
import { sendVerificationEmail } from "@/lib/email";

export const register = async (values: SignUpValues) => {
    const validatedFields = signUpSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, firstName, lastName } = validatedFields.data;
    const hashedPassword = hashSync(password, 12);

    try {
        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });

        const verificationToken = await createVerificationToken(newUser.email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
            newUser.firstName
        );

        return { success: "Confirmation email sent!" };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return { error: "Email already in use!" };
            }
        }
        console.error("Registration error:", error);
        return { error: "An error occurred during registration." };
    }
}; 