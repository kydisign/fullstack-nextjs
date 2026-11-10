// import Link from next/link
import Link from "next/link";

// type User
type User = {
    id: string;
    name: string | null;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
};

// import icons from lucide-react
import { Pencil } from "lucide-react";

// import DeleteUserForm
import DeleteUserForm from "@/components/user/delete";

export default function UserTable({ users }: { users: User[] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-zinc-200">
            <table className="min-w-full divide-y divide-zinc-200">
                <thead className="bg-zinc-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Created At
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-zinc-200 bg-white">
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="transition hover:bg-zinc-50"
                        >
                            {/* Name */}
                            <td className="px-6 py-4">
                                <div className="font-medium text-sm text-zinc-900">
                                    {user.name || "No Name"}
                                </div>
                            </td>

                            {/* Email */}
                            <td className="px-6 py-4 text-sm text-zinc-600">
                                {user.email}
                            </td>

                            {/* Created At */}
                            <td className="px-6 py-4 text-sm text-zinc-600">
                                {user.createdAt?.toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }) || "N/A"}
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 text-right">
                                <div className="inline-flex items-center gap-2">
                                    {/* Edit */}
                                    <Link
                                        href={`/users/edit/${user.id}`}
                                        className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
                                        title="Edit"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Link>

                                    {/* Delete */}
                                    <DeleteUserForm
                                        userId={user.id}
                                        userName={user.name}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}

                    {/* Empty State */}
                    {users.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-6 py-8 text-center text-sm text-zinc-500"
                            >
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
