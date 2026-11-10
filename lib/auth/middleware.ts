 // import redirect dari next/navigation
import { redirect } from 'next/navigation'

// import auth session
import { getCurrentUser } from '@/lib/auth/session'

/** Middleware untuk memastikan user sudah login
 * Jika belum, redirect ke halaman sign-in
 */
export async function authIsRequired() {

    // pastikan user sudah authenticated
  const user = await getCurrentUser();

    // jika user belum login, redirect ke halaman sign-in
  if (!user) {
      redirect('/sign-in');
  }

  // return user object
  return user;
}

/** Middleware untuk memastikan user belum login
 * Jika sudah login, redirect ke halaman dashboard
 */
export async function authIsNotRequired() {

    // pastikan user belum authenticated
  const user = await getCurrentUser();

    // jika user sudah login, redirect ke halaman dashboard
  if (user) {
      redirect('/dashboard');
  }
}
