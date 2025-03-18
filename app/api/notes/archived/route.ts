import { NextResponse } from "next/server"
import { getSession } from "@/lib/getSession"
import { db } from "@/lib/prisma"

export async function GET() {
    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = await db.user.findUnique({
            where: {
                email: session.user.email,
            },
        })
        if (!user) {
            return NextResponse.json([], { status: 200 })
        }

        const archivedNotes = await db.note.findMany({
            where: {
                userId: user.id,
                isArchived: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        return NextResponse.json(archivedNotes, { status: 200 })
    } catch (error) {
        console.error("Error fetching archived notes:", error)
        return NextResponse.json({ error: "Failed to fetch archived notes" }, { status: 500 })
    }
}
