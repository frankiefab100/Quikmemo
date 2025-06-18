import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { token, password } = await req.json();

    if (!token || !password) {
        return NextResponse.json({ message: "Missing token or password" }, { status: 400 });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await db.user.findFirst({
        where: {
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { gt: new Date() },
        },
    });

    if (!user) {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
        },
    });

    return NextResponse.json({ message: "Password reset successful" });
}
