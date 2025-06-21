"use server";
import { db } from "@/lib/prisma";
import { randomBytes } from "crypto";

export const createVerificationToken = async (email: string) => {
    const token = randomBytes(32).toString("hex");
    const expires = new Date(new Date().getTime() + 3600 * 1000); // Expires in 1 hour

    const existingToken = await db.verificationToken.findFirst({
        where: { email },
    });

    if (existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id },
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return verificationToken;
};

export const verifyEmail = async (token: string) => {
    const existingToken = await db.verificationToken.findUnique({
        where: { token },
    });

    if (!existingToken) {
        return { error: "Token does not exist!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await db.user.findUnique({
        where: { email: existingToken.email },
    });

    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email, // In case user wants to change their email
        },
    });

    await db.verificationToken.delete({
        where: { id: existingToken.id },
    });

    return { success: "Email verified!" };
}; 