import { NextResponse } from "next/server"
import { db } from "@/lib/prisma"

export async function PATCH(request: Request, props: {
    params: Promise<{ id: string }>;
}) {
    try {
        const params = await props.params;

        const { title, content, tags, isArchived } = await request.json()
        const updatedNote = await db.note.update({

            where: params,
            data: { title, content, tags, isArchived },
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
        const params = await props.params;
        await db.note.delete({
            where: params,
        });
        return NextResponse.json("Note deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Failed to delete note:", error);
        return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
    }
}

