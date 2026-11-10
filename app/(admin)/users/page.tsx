// import Link
import Link from "next/link";

// import authIsRequired to protect the users page
import { authIsRequired } from "@/lib/auth/middleware";

// import prisma client
import { prisma } from "@/lib/db";

// import Sidebar
import Sidebar from "@/components/layout/sidebar";

// import PageHeader component
import PageHeader from "@/components/common/page-header";

// import table component
import UserTable from "@/components/user/table";

// import Metadata dari next
import { Metadata } from 'next';

// define metadata untuk halaman sign-in
export const metadata: Metadata = {
    title: 'Users - FullStack Next.js',
    description: 'List of all users',
};

export default async function UsersPage() {

    // protect the page
    await authIsRequired();

    // get all users
    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

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
                            subtitle="List of all users"
                            action={
                                <Link
                                    href="/users/create"
                                    className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                                >
                                    Add User
                                </Link>
                            }
                        />

                        {/* Table */}
                        <UserTable users={users} />
                    </main>
                </div>
            </div>
        </div>
    );
}
