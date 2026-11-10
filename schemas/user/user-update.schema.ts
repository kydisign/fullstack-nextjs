// import zod
import { z } from "zod";

/**
 * Zod schema untuk validasi edit user
 */
export const updateUserSchema = z.object({
    id: z.string().cuid("ID user tidak valid"),
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine((v) => !v || v.length >= 8, "Password minimal 8 karakter"),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
