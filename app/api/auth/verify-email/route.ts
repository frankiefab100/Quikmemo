import { type NextRequest, NextResponse } from "next/server"
import { verifyEmail } from "@/actions/verification.action"

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json()
        if (!token) {
            return NextResponse.json({ error: "A verification token is required." }, { status: 400 })
        }

        const result = await verifyEmail(token)
        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 400 })
        }

        return NextResponse.json({ success: result.success })
    } catch (error) {
        console.error("Email verification API error:", error)
        return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 })
    }
}