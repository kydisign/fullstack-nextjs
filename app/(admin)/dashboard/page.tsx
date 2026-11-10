// import authIsRequired dari lib/auth/middleware
import { authIsRequired } from '@/lib/auth/middleware'

// import getCurrentUser dari lib/auth/session
import { getCurrentUser } from '@/lib/auth/session'

// import Sidebar component
import Sidebar from '@/components/layout/sidebar'

// import PageHeader component
import PageHeader from '@/components/common/page-header'

// import Metadata dari next
import { Metadata } from 'next';

// define metadata untuk halaman sign-in
export const metadata: Metadata = {
    title: 'Dashboard - FullStack Next.js',
    description: 'Admin dashboard overview',
};

export default async function DashboardPage() {

    // pastikan user sudah authenticated
    await authIsRequired()

    // ambil user yang sedang login
    const user = await getCurrentUser()

    return (
        <div className="bg-zinc-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Sidebar */}
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <Sidebar />
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 rounded-3xl bg-white p-5 sm:p-8 shadow-sm">
                        {/* Page Header */}
                        <PageHeader
                            title="Dashboard"
                            subtitle="Overview of your admin panel"
                        />

                        <p className="mt-3 text-sm text-zinc-600">
                            Hi, <strong>{user?.name}</strong>, welcome to your dashboard
                        </p>
                    </main>
                </div>
            </div>
        </div>
    );
}
