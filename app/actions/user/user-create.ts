'use server'

// import Bcrypt untuk hashing password
import bcrypt from 'bcryptjs'

// import prisma client
import { prisma } from '@/lib/db'

// import redirect dari next/navigation
import { redirect } from 'next/navigation'

// import createUserSchema dari schemas
import { createUserSchema } from '@/schemas/user/user-create.schema'

//interface untuk error validasi
interface CreateUserActionState {
    errors: {
        name?: string[];
        email?: string[];
        password?: string[];
        _form?: string[];
    }
}

/**
 * Action untuk proses pembuatan user baru
 * @param formData data dari form pembuatan user
 */
export async function createUserAction(
    _prevState: CreateUserActionState,
    formData: FormData
): Promise<CreateUserActionState> {

    // validasi form data menggunakan zod
    const result = createUserSchema.safeParse({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    })

    // jika validasi gagal
    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors }
    }

    try {
        // hash password menggunakan bcrypt
        const hashedPassword = await bcrypt.hash(result.data.password, 10)

        // simpan user baru ke database menggunakan prisma
        await prisma.user.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                password: hashedPassword,
            },
        })

        // redirect ke halaman users setelah berhasil membuat user baru
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

        // Error umum
        return {
            errors: {
                _form: ['Registration failed, please try again'],
            },
        }
    }
}
