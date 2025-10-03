import * as z from "zod";


export const userSchema = z.object({
    name: z.string().min(2, { message: 'Name Should be at least 4 characters' }),
    email: z.email({ message: 'Enter Valid Email Address' }),
    address: z.string().min(10, { message: 'Address is required' }).max(400),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }).max(16, { message: 'Password cannot be at more than 16 characters' })

})

export const LoginSchema = z.object({
    email: z.email({ message: 'Email is required' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }).max(16, { message: 'Password cannot be at more than 16 characters' })
})