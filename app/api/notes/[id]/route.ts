import { NextResponse } from "next/server"
import { db } from "@/lib/prisma"
import { getSession } from "@/lib/getSession"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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

        const { title, content, tags, isArchived } = await request.json()
        const updatedNote = await db.note.update({
            where: {
                id: params.id,
            },
            data: {
                ...(title !== undefined && { title }),
                ...(content !== undefined && { content }),
                ...(tags !== undefined && { tags }),
                ...(isArchived !== undefined && { isArchived }),
                lastEdited: new Date(),
            },
        })
        return NextResponse.json(updatedNote, { status: 200 })
    } catch (error) {
        console.error("Failed to update note:", error)
        return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

        await db.note.delete({
            where: {
                id: params.id,
            },
        })
        return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 })
    } catch (error) {
        console.error("Failed to delete note:", error)
        return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
    }
}

