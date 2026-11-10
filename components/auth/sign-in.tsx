"use client";

// import Link dari next/link
import Link from "next/link";

// import useActionState dari react
import { useActionState } from 'react'

// import signInAction dari server actions
import { signInAction } from "@/app/actions/auth/sign-in";

// initial state untuk form
const initialState = { errors: {} as Record<string, string[]> };

export function SignInForm() {

    // useActionState untuk menghandle state form dan action
    const [formState, formAction, isPending] = useActionState(signInAction, initialState);

    return (
        <div className="relative min-h-[calc(100vh-4rem)] bg-zinc-100">
            {/* Subtle background effects */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />
                <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center px-6 py-14">
                <div className="w-full">
                    <div className="rounded-3xl bg-white p-8 shadow-sm backdrop-blur sm:p-10">
                        <div className="mb-8 text-center">
                            <h3 className="text-3xl font-semibold tracking-tight text-zinc-900">
                                Sign in
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                                Enter your email below to login to your account
                            </p>
                        </div>

                        <form action={formAction} className="space-y-5" noValidate>
                            {formState?.errors?._form?.length ? (
                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {formState.errors._form[0]}
                                </div>
                            ) : null}

                            {/* Email field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-zinc-800"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className={`block w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:ring-2 focus:ring-zinc-900/10 ${formState?.errors?.email?.length ? "border-red-300" : "border-zinc-200"
                                            }`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {formState?.errors?.email?.length ? (
                                    <p className="mt-2 text-sm text-red-600">{formState.errors.email[0]}</p>
                                ) : null}
                            </div>

                            {/* Password field */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-zinc-800"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-700"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className={`block w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:ring-2 focus:ring-zinc-900/10 ${formState?.errors?.password?.length ? "border-red-300" : "border-zinc-200"
                                            }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {formState?.errors?.password?.length ? (
                                    <p className="mt-2 text-sm text-red-600">{formState.errors.password[0]}</p>
                                ) : null}
                            </div>

                            {/* Remember me checkbox */}
                            <div className="flex items-center gap-3">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900/20"
                                />
                                <label htmlFor="remember" className="text-sm text-zinc-700">
                                    Remember me for 30 days
                                </label>
                            </div>

                            {/* Submit button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
                                >
                                    {isPending ? "Signing in..." : "Sign in"}
                                </button>

                                <p className="mt-4 text-center text-xs text-zinc-500">
                                    Don't have an account?{" "}
                                    <Link
                                        href="/sign-up"
                                        className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-700"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    <p className="mt-6 text-center text-xs text-zinc-500">
                        By continuing, you agree to our{" "}
                        <a href="#" className="underline underline-offset-4 hover:text-zinc-700">
                            Terms
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline underline-offset-4 hover:text-zinc-700">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
