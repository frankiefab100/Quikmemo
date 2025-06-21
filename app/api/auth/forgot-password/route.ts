import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { forgotPasswordSchema } from "@/lib/formSchema";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parseResult = forgotPasswordSchema.safeParse(body);

    if (!parseResult.success) {
        return NextResponse.json(
            { message: "Invalid input", errors: parseResult.error.format() },
            { status: 400 }
        );
    }

    const { email } = parseResult.data;

    try {
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            // For security, always respond with success
            return NextResponse.json(
                { message: "If the email exists, a reset link has been sent." },
                { status: 200 }
            );
        }

        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const expires = new Date(Date.now() + 3600 * 1000);

        await db.user.update({
            where: { email },
            data: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: expires,
            },
        });

        const resetUrl = `${process.env.AUTH_URL}/reset-password/${token}`;

        await sendEmail({
            to: email,
            subject: "Quikmemo Password Reset",
            text: `Reset your password by clicking the link: ${resetUrl}`,
            html: `<p>Reset your password by clicking <a href="${resetUrl}">here</a>.</p>`,
        });

        return NextResponse.json(
            { message: "If the email exists, a reset link has been sent." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}