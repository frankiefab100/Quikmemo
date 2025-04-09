import { NextResponse } from "next/server"
import { db } from "@/lib/prisma"
import { getSession } from "@/lib/getSession"

export async function PATCH(request: Request, props: {
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

        const { title, content, tags, isArchived, isFavorite, isTrashed } = await request.json()
        const updatedNote = await db.note.update({
            where: {
                id: params.id,
            },
            data: {
                ...(title !== undefined && { title }),
                ...(content !== undefined && { content }),
                ...(tags !== undefined && { tags }),
                ...(isArchived !== undefined && { isArchived }),
                ...(isFavorite !== undefined && { isFavorite }),
                ...(isTrashed !== undefined && { isTrashed }),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })
        return NextResponse.json(updatedNote, { status: 200 })
    } catch (error) {
        console.error("Failed to update note:", error)
        return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
    }
}

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

        // Mark the note as trashed instead of deleting it
        const trashedNote = await db.note.update({
            where: {
                id: params.id,
            },
            data: {
                isTrashed: true,
                updatedAt: new Date(),
                createdAt: new Date(),
            },
        })

        return NextResponse.json(trashedNote, { status: 200 })
    } catch (error) {
        console.error("Failed to delete note:", error)
        return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
    }
}
