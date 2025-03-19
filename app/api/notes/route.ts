import { NextResponse } from "next/server"
import { db } from "@/lib/prisma"
import { getSession } from "@/lib/getSession"
import { NOTES } from "@/app/data/data"

export async function GET() {
    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Find or create user by email
        let user = await db.user.findUnique({
            where: {
                email: session.user.email,
            },
        })
        // Create user if they don't exist
        if (!user && session.user.email) {
            try {
                user = await db.user.create({
                    data: {
                        email: session.user.email,
                        password: "",
                        firstName: session.user.name?.split(" ")[0] || "",
                        lastName: session.user.name?.split(" ")[1] || "",
                    },
                })
                // console.log("Created new user:", user.id)
            } catch (error) {
                console.error("Failed to create user:", error)
                return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
            }
        }
        if (!user) {
            return NextResponse.json({ error: "User not found or created" }, { status: 500 });
        }

        // Get user's notes
        let notes = await db.note.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        // If user is new, add default welcome notes
        if (notes.length === 0) {
            try {
                const defaultNotes = await Promise.all(
                    NOTES.map((note) =>
                        db.note.create({
                            data: {
                                title: note.title,
                                content: note.content,
                                tags: note.tags,
                                userId: user.id,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                isArchived: false,
                                isFavorite: false,
                                isDeleted: false,
                            },
                        }),
                    ),
                )
                notes = defaultNotes
            } catch (error) {
                console.error("Error creating default notes:", error)
                return NextResponse.json([], { status: 200 })
            }
        }
        return NextResponse.json(notes, { status: 200 })
    } catch (error) {
        console.error("Failed to fetch notes:", error)
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session?.user?.email) return

        let user = await db.user.findUnique({
            where: {
                email: session.user.email,
            },
        })

        if (!user && session.user.email) {
            try {
                user = await db.user.create({
                    data: {
                        email: session.user.email,
                        password: "",
                        firstName: session.user.name?.split(" ")[0] || "",
                        lastName: session.user.name?.split(" ")[1] || "",
                    },
                })
            } catch (error) {
                console.error("Error creating user:", error)
                return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
            }
        }
        if (!user) {
            return NextResponse.json({ error: "User not found and could not be created" }, { status: 404 })
        }

        const { title, content, tags } = await request.json()
        if (!title || !content) {
            return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
        }

        const note = await db.note.create({
            data: {
                title,
                content,
                tags,
                userId: user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                isArchived: false,
                isFavorite: false,
                isDeleted: false,
            },
        })
        return NextResponse.json(note, { status: 200 })
    } catch (error) {
        console.error("Failed to create note:", error)
        return NextResponse.json({ error: "Failed to create note" }, { status: 500 })
    }
}

