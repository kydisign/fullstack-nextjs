// import authIsRequired to protect the users page
import { authIsRequired } from "@/lib/auth/middleware";

// import Sidebar
import Sidebar from "@/components/layout/sidebar";

// import PageHeader component
import PageHeader from "@/components/common/page-header";

// import UserCreateForm component
import UserCreateForm from "@/components/user/create";

// import Metadata dari next
import { Metadata } from 'next';

// define metadata untuk halaman sign-in
export const metadata: Metadata = {
    title: 'Create User - FullStack Next.js',
    description: 'Create a new user account',
};

export default async function UsersCreatePage() {

    // protect the page
    await authIsRequired();

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
                            title="Users Management"
                            subtitle="Create new user"
                        />

                        {/* Form */}
                        <UserCreateForm />
                    </main>
                </div>
            </div>
        </div>
    );
}
