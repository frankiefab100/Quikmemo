import { NextResponse } from "next/server"
import { db } from "@/lib/prisma"

export async function GET() {
    try {
        const notes = await db.note.findMany({
            orderBy: {
                updatedAt: "desc",
                // createdAt: "desc",
            },
        })
        return NextResponse.json(notes, { status: 200 })
    } catch (error) {
        console.error("Failed to fetch notes:", error)
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
    }
}


export async function POST(request: Request) {
    try {
        const { title, content, tags } = await request.json()

        if (!title || !content) {
            return new NextResponse("Title and Content required", { status: 400 });
        }

        const note = await db.note.create({
            data: {
                title,
                content,
                tags,
                isArchived: false,
            },
        })

        return NextResponse.json(note, { status: 200 });
    } catch (error) {
        console.error("Failed to create note:", error)
        return NextResponse.json({ error: "Failed to create note" }, { status: 500 })
    }
}

