import { auth } from "@/lib/auth"

export async function getSession() {
  try {
    const session = await auth();
    // console.log("DEBUG: getSession() result:", session);
    return session;
  } catch (error) {
    // console.error("DEBUG: getSession() error:", error);
    return null;
  }
}