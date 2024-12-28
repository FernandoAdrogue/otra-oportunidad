import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/zod";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Credentials({
          authorize: async (credentials) => {
            const {data,success} = loginSchema.safeParse(credentials);

            // verificar vavalidaciones
            if (!success) {
              throw new Error("Invalid credentials");
            }
            // verificar si el usuario existe
            const user = await prisma.user.findUnique({
                where: {
                    email: data.email
                }
            });

            if (!user || !user.password)  {
                throw new Error("Invalid credentials");
            };

            // verificar la contraseña es correcta
            const isValid = await bcrypt.compare(data.password, user.password);

            if (!isValid) {
                throw new Error("Invalid credentials");
            };
            
            return user;
          },
        }),
      ],
} satisfies NextAuthConfig