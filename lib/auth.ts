import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { Adapter } from "next-auth/adapters";
// import { db } from "./prisma";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});