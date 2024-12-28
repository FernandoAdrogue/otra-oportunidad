import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
//import { prisma } from "@/prisma"
import authConfig from "./auth.config"
import { db } from "./lib/db"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  //adapter: PrismaAdapter(prisma),
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})