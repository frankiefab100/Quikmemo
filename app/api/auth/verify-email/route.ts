import { type NextRequest, NextResponse } from "next/server"
import { verifyEmailToken } from "@/lib/verification"

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json()
        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 })
        }

        const result = await verifyEmailToken(token)
        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 400 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Email verification error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
