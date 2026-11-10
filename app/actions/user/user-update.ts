'use server'

// import Bcrypt untuk hashing password
import bcrypt from 'bcryptjs'

// import prisma client
import { prisma } from '@/lib/db'

// import redirect dari next/navigation
import { redirect } from 'next/navigation'

// import updateUserSchema dari schemas
import { updateUserSchema } from '@/schemas/user/user-update.schema'

//interface untuk error validasi
interface UpdateUserActionState {
    errors: {
        id?: string[];
        name?: string[];
        email?: string[];
        password?: string[];
        _form?: string[];
    };
}

/**
 * Action untuk proses update user
 * @param formData data dari form update user
 */
export async function updateUserAction(
    _prevState: UpdateUserActionState,
    formData: FormData
): Promise<UpdateUserActionState> {

    // validasi form data menggunakan zod
    const result = updateUserSchema.safeParse({
        id: formData.get('id') as string,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string, // boleh kosong
    })

    // jika validasi gagal
    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors }
    }

    try {
        // siapkan data update
        const data: {
            name: string
            email: string
            password?: string
        } = {
            name: result.data.name,
            email: result.data.email,
        }

        // jika password diisi, baru hash dan update
        if (result.data.password && result.data.password.length > 0) {
            // hash password menggunakan bcrypt
            const hashedPassword = await bcrypt.hash(result.data.password, 10)
            data.password = hashedPassword
        }

        // update user di database menggunakan prisma
        await prisma.user.update({
            where: {
                id: result.data.id,
            },
            data,
        })

        // redirect ke halaman users setelah berhasil update user
        redirect('/users')
        
    } catch (error: any) {

        // Error NEXT_REDIRECT
        if (error?.digest?.startsWith('NEXT_REDIRECT')) throw error

        // Error duplikat email dari Prisma (unique constraint)
        // NOTE: Prisma unique constraint biasanya code = P2002
        if (error?.code === 'P2002') {
            return {
                errors: {
                    email: ['Email already registered'],
                },
            }
        }

        // Kalau id tidak ditemukan, prisma biasanya P2025
        if (error?.code === 'P2025') {
            return {
                errors: {
                    _form: ['User not found'],
                },
            }
        }

        // Error umum
        return {
            errors: {
                _form: ['Update failed, please try again'],
            },
        }
    }
}
