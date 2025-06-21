import { randomBytes } from "crypto";
import { db } from "./prisma";

export function generateVerificationToken(): string {
    return randomBytes(32).toString("hex");
}

export async function createVerificationToken(email: string): Promise<string> {
    const token = generateVerificationToken();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Delete any existing tokens for this email
    await db.verificationToken.deleteMany({
        where: { email },
    });

    // Create new token
    await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });
    return token;
}

export async function verifyEmailToken(token: string) {
    const verificationToken = await db.verificationToken.findUnique({
        where: { token },
    });

    if (!verificationToken) {
        return { error: "Invalid token" };
    }

    if (verificationToken.expires < new Date()) {
        await db.verificationToken.delete({
            where: { token },
        });
        return { error: "Token expired" };
    }

    // Update user as verified
    await db.user.update({
        where: { email: verificationToken.email },
        data: { emailVerified: new Date() },
    });

    // Delete the token
    await db.verificationToken.delete({
        where: { token },
    });
    return { success: true };
}
