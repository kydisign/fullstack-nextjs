"use client";

// import Link dari next/link
import Link from "next/link";

// import useActionState dari react
import { useActionState } from "react";

// import server action
import { updateUserAction } from "@/app/actions/user/user-update";

// type untuk props User
type UserEditFormProps = {
    user: {
        id: string;
        name: string | null;
        email: string;
    } | null;
};

// initial state untuk form
const initialState = { errors: {} as Record<string, string[]> };

export default function UserEditForm({ user }: UserEditFormProps) {

    // useActionState untuk menghandle state form dan action
    const [formState, formAction, isPending] = useActionState(updateUserAction, initialState);

    return (
        <div className="relative">
            {/* Error umum */}
            {formState?.errors?._form?.length ? (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {formState.errors._form[0]}
                </div>
            ) : null}

            <form className="space-y-5" action={formAction} noValidate>
                {/* Hidden ID */}
                <input type="hidden" name="id" value={user?.id} />

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-800">
                        Full Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            defaultValue={user?.name ?? ""}
                            className={`block w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:ring-2 focus:ring-zinc-900/10 ${formState?.errors?.name?.length ? "border-red-300" : "border-zinc-200"
                                }`}
                            placeholder="User full name"
                            disabled={isPending}
                        />
                    </div>

                    {/* Name error */}
                    {formState?.errors?.name?.length ? (
                        <p className="mt-2 text-sm text-red-600">{formState.errors.name[0]}</p>
                    ) : null}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-800">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            defaultValue={user?.email ?? ""}
                            className={`block w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:ring-2 focus:ring-zinc-900/10 ${formState?.errors?.email?.length ? "border-red-300" : "border-zinc-200"
                                }`}
                            placeholder="you@example.com"
                            disabled={isPending}
                        />
                    </div>

                    {/* Email error */}
                    {formState?.errors?.email?.length ? (
                        <p className="mt-2 text-sm text-red-600">{formState.errors.email[0]}</p>
                    ) : null}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-zinc-800">
                        New Password <span className="text-zinc-500">(optional)</span>
                    </label>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            className={`block w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:ring-2 focus:ring-zinc-900/10 ${formState?.errors?.password?.length ? "border-red-300" : "border-zinc-200"
                                }`}
                            placeholder="Leave blank to keep current password"
                            disabled={isPending}
                        />
                    </div>

                    <p className="mt-2 text-sm text-zinc-500">Kosongkan jika tidak ingin mengganti password.</p>

                    {/* Password error */}
                    {formState?.errors?.password?.length ? (
                        <p className="mt-2 text-sm text-red-600">{formState.errors.password[0]}</p>
                    ) : null}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
                    <Link
                        href="/users"
                        className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
                    >
                        {isPending ? (
                            <span className="inline-flex items-center justify-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                Updating...
                            </span>
                        ) : (
                            "Update User"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
