// import notFound
import { notFound } from "next/navigation";

// import authIsRequired to protect the users page
import { authIsRequired } from "@/lib/auth/middleware";

// import Sidebar
import Sidebar from "@/components/layout/sidebar";

// import PageHeader component
import PageHeader from "@/components/common/page-header";

// import prisma client
import { prisma } from "@/lib/db";

// import UserEditForm component
import UserEditForm from "@/components/user/edit";

// import Metadata dari next
import { Metadata } from 'next';

// define metadata untuk halaman sign-in
export const metadata: Metadata = {
    title: 'Edit User - FullStack Next.js',
    description: 'Edit a user account',
};

export default async function UsersEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    // protect the page
    await authIsRequired();

    // destructure id from params
    const { id } = await params;

    // get the user by id
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        }
    });

    // if user not found, return notFound
    if (!user) {
        return notFound();
    }

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
                            subtitle="Edit user"
                        />

                        {/* Form */}
                        <UserEditForm user={user} />
                    </main>
                </div>
            </div>
        </div>
    );
}
