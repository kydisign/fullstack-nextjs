// import authIsNotRequired dari lib/auth
import { authIsNotRequired } from '@/lib/auth/middleware'

// import SignUpForm component
import { SignInForm } from "@/components/auth/sign-in";

// import Metadata dari next
import { Metadata } from 'next';

// define metadata untuk halaman sign-in
export const metadata: Metadata = {
    title: 'Sign In - FullStack Next.js',
    description: 'Sign in to your account',
};

export default async function SignInPage() {

    //jika user sudah login, redirect ke halaman dashboard
    await authIsNotRequired();

    return <SignInForm />;
}
