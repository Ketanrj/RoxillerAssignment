import { z } from "zod";

export const userUpdateSchema = z
    .object({
        name: z.string().min(4, { message: "Name should be at least 4 characters" }).optional(),
        email: z.string().email({ message: "Enter valid email address" }).optional(),
    })
    .refine(
        (data) => data.name !== undefined || data.email !== undefined,
        {
            message: "At least one field (name or email) is required",
            path: ["name"], // you can point the error to a specific field, or leave as []
        }
    );

export const passwordSchema = z.object({
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special symbol" })
})


export const ResetpasswordSchema = z.object({
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special symbol" }),
    confirmpassword: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special symbol" }),
})