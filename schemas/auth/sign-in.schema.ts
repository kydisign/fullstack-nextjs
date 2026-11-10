import {z} from "zod";

export const signInSchema = z.object ({
    email: z.string().trim().email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
});

export type SignInInput = z.infer<typeof signInSchema>;