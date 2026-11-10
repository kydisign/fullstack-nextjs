// import cookies dari next/headers untuk mengelola cookie
import { cookies } from 'next/headers'

// import prisma client
import { prisma } from '@/lib/db'

// import auth utils
import { sha256, generateToken, SESSION_COOKIE } from '@/lib/auth/utils'

/**
 * Membuat session baru untuk user
 * @param userId ID user yang akan dibuatkan session
 */
export async function createSession(userId: string): Promise<void> {
  // Generate token dan hash-nya
  const token = generateToken()
  const tokenHash = sha256(token)

  // Session berlaku 30 hari
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  // Simpan session ke database
  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  })

  // Set cookie dengan token yang belum di-hash
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true, // Tidak bisa diakses oleh JavaScript
    secure: process.env.NODE_ENV === 'production', // HTTPS hanya di production
    sameSite: 'lax', // Perlindungan CSRF
    path: '/', // Berlaku untuk seluruh website
    expires: expiresAt, // Expire sesuai database
  })
}

/**
 * Menghapus session user (logout)
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  // Hapus session dari database jika token ada
  if (token) {
    await prisma.session.deleteMany({
      where: { tokenHash: sha256(token) },
    })
  }

  // Clear cookie dengan meng-set expired date ke masa lalu
  cookieStore.set(SESSION_COOKIE, '', {
    path: '/',
    expires: new Date(0), // Expire immediately
  })
}

/**
 * Mendapatkan user yang sedang login berdasarkan session
 * @returns User object jika session valid, null jika tidak
 */
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  // Jika tidak ada token, user tidak login
  if (!token) {
    return null
  }

  // Cari session di database berdasarkan hash token
  const session = await prisma.session.findUnique({
    where: { tokenHash: sha256(token) },
    include: { user: true }, // Include data user
  })

  // Jika session tidak ditemukan
  if (!session) {
    return null
  }

  // Cek apakah session sudah expired
  if (session.expiresAt < new Date()) {
    // Hapus session expired dari database
    await prisma.session.delete({
      where: { id: session.id },
    })
    return null
  }

  // Return data user
  return session.user
}
