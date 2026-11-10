'use server'

// import prisma client
import { prisma } from '@/lib/db'

// import authIsRequired dari lib/auth/middleware
import { authIsRequired } from '@/lib/auth/middleware'

// import revalidatePath
import { revalidatePath } from 'next/cache'

export async function deleteUserAction(formData: FormData) {

    // protect action
    await authIsRequired()

    // destructure id
    const id = formData.get('id') as string

    // delete
    try {

        // delete user di database berdasarkan id
        await prisma.user.delete({
            where: { id },
        })
    } catch (err: any) {

        // jika id tidak ditemukan / sudah terhapus
        // Prisma biasanya melempar error code P2025
        if (err?.code === 'P2025') {

            // revalidate halaman list users
            revalidatePath('/users')
            return
        }

        throw new Error('Gagal menghapus user. Silakan coba lagi.')
    }

    // revalidate halaman list users
    revalidatePath('/users')
}
