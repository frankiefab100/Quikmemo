import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
        return NextResponse.json({ success: false, message: "No token provided." }, { status: 400 });
    }
    const user = await db.user.findFirst({ where: { verificationToken: token } });
    if (
        !user ||
        !user.verificationTokenExpires ||
        user.verificationTokenExpires < new Date()
    ) {
        return NextResponse.json({ success: false, message: "Invalid or expired token." }, { status: 400 });
    }
    await db.user.update({
        where: { id: user.id },
        data: {
            emailVerified: new Date(),
            verificationToken: null,
            verificationTokenExpires: null,
        },
    });
    return NextResponse.json({ success: true, message: "Email verified!" });
}