import { auth } from "@/lib/auth"

export async function getSession() {
  try {
    const session = await auth()
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

