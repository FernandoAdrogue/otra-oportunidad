"use server";

import { signIn } from "@/auth";
import { loginSchema, registerSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
    try {
        await signIn("credentials",{
            email: values.email,
            password: values.password,
            redirect: false,
          });
        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message };
        };
        return { error: "error 500"}
    }
}

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
    try{
        const {data,success} = registerSchema.safeParse(values);
        if(!success){
            return {error: "Invalid data"};
        }
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if(user){
            return {error: "Invalid data"};
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create the user
        await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
                phone: data.phone
            }
        });

        await signIn("credentials",{
            email: values.email,
            password: values.password,
            redirect: false,
          });
          
        return { success: true };
    }
    catch(error){
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message };
        };
        return { error: "error 500"}
    }
}