import { NextResponse } from "next/server"
import { db } from "@/lib/prisma"
import { getSession } from "@/lib/getSession"

export async function DELETE(request: Request, props: {
    params: Promise<{ id: string }>;
}) {
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
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
        const params = await props.params;
        const existingNote = await db.note.findUnique({
            where: {
                id: params.id,
            },
        })

        if (!existingNote) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 })
        }
        if (existingNote.userId !== user.id) {
            return NextResponse.json({ error: "Unauthorized: Note doesn't belong to user" }, { status: 403 })
        }
        // Verify the note is in trash
        if (!existingNote.isTrashed) {
            return NextResponse.json({ error: "Note must be in trash to be permanently deleted" }, { status: 400 })
        }
        await db.note.delete({
            where: {
                id: params.id,
            },
        })

        return NextResponse.json({ message: "Note permanently deleted" }, { status: 200 })
    } catch (error) {
        console.error("Failed to permanently delete note:", error)
        return NextResponse.json({ error: "Failed to permanently delete note" }, { status: 500 })
    }
}
