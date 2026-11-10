"use client";

// import Link component from next/link
import Link from "next/link";

// import usePathname
import { usePathname } from "next/navigation";

// import icon dari lucide-react
import { LayoutDashboard, Users, LogOut } from "lucide-react";

// import action logoutAction
import { logoutAction } from "@/app/actions/auth/sign-in";

export default function Sidebar() {

    // hooks get pathname
    const pathname = usePathname();

    // helper untuk cek menu aktif
    const active = (href: string) =>
        pathname === href || pathname.startsWith(href + "/");

    // helper class menu
    const itemClass = (isActive: boolean) =>
        `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive
            ? "bg-zinc-900 text-white"
            : "text-zinc-700 hover:bg-zinc-100"
        }`;

    // logout handler
    const handleLogout = async () => {
        await logoutAction();
    };

    return (
        <aside className="w-full md:w-64 shrink-0 rounded-3xl bg-white p-4 shadow-sm">
            <div className="flex h-full flex-col">
                {/* Brand */}
                <div className="mb-3 flex items-center gap-3 px-2 border-b border-zinc-200 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-xs font-bold text-white">
                        SK
                    </div>
                    <span className="text-sm font-semibold text-zinc-900">
                        SANTRIKODING
                    </span>
                </div>

                {/* Menu */}
                <nav className="flex flex-1 flex-col gap-1">
                    <Link
                        href="/dashboard"
                        className={itemClass(active("/dashboard"))}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>

                    <Link
                        href="/users"
                        className={itemClass(active("/users"))}
                    >
                        <Users className="h-4 w-4" />
                        Users Management
                    </Link>
                </nav>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
