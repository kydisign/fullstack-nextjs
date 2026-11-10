'use server'

// import Bcrypt untuk hashing password
import bcrypt from 'bcryptjs'

// import prisma client
import { prisma } from '@/lib/db'

// import redirect dari next/navigation
import { redirect } from 'next/navigation'

// import signInSchema dari schemas
import { signInSchema } from '@/schemas/auth/sign-in.schema'

// import createSession dari lib/auth
import { createSession, deleteSession } from '@/lib/auth/session'

//interface untuk error validasi
interface SignInActionState {
    errors: {
        email?: string[];
        password?: string[];
        _form?: string[];
    }
}

/**
 * Action untuk proses sign-in
 * @param formData data dari form sign-in
 */
export async function signInAction( 
    _prevState: SignInActionState, 
    formData: FormData
): Promise<SignInActionState> {

    // validasi form data menggunakan zod
    const result = signInSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    // jika validasi gagal
    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    // cari user berdasarkan email
    const user = await prisma.user.findUnique({
        where: {
            email: result.data.email,
        },
    });

    // jika user tidak ditemukan atau password tidak sesuai
    if (!user || !(await bcrypt.compare(result.data.password, user.password))) {
        return {
            errors: {
                _form: ['Email atau password salah'],
            },
        };
    }

    // buat session untuk user yang berhasil sign-in
    await createSession(user.id);

    // redirect ke halaman dashboard setelah berhasil sign-in
    redirect('/dashboard');
    
}

/**
 * Action untuk proses logout
 */
export async function logoutAction() {

    // hapus session user
    await deleteSession()

    // redirect ke halaman sign-in setelah logout
    redirect('/sign-in')
}
