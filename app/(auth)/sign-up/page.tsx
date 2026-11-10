import { Suspense } from "react";

// import authIsNotRequired dari lib/auth
import { authIsNotRequired } from '@/lib/auth/middleware'

// import SignUpForm component
import { SignUpForm } from "@/components/auth/sign-up";

// import Metadata dari next
import { Metadata } from 'next';

// define metadata untuk halaman sign-in
export const metadata: Metadata = {
    title: 'Sign Up - FullStack Next.js',
    description: 'Create an account in seconds',
};

async function SignUpContent() {
    await authIsNotRequired();
    return <SignUpForm />;
}

export default function SignUpPage() {
    return (
        <Suspense fallback={<p>Memuat formulir...</p>}>
            <SignUpContent />
        </Suspense>
    );
}


