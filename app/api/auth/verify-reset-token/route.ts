import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token || typeof token !== "string") {
        return NextResponse.json({ valid: false }, { status: 400 });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await db.user.findFirst({
        where: {
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { gt: new Date() },
        },
    });

    if (!user) return NextResponse.json({ valid: false });

    return NextResponse.json({ valid: true });
}
