import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params

        // if (!params.id) {
        //     return new NextResponse("Not found", { status: 404 });
        // }

        const { title, content, tags, isArchived } = await request.json()
        const updatedNote = await prisma.note.update({
            where: { id },
            data: { title, content, tags, isArchived },
        })
        return NextResponse.json(updatedNote, { status: 200 })
    } catch (error) {
        console.error("Failed to update note:", error)
        return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const deletedNote = await prisma.note.delete({
            where: { id },
        })
        return NextResponse.json(deletedNote, { status: 200 })
    } catch (error) {
        console.error("Failed to delete note:", error)
        return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
    }
}

