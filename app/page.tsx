// import Link dari next/link
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-100 font-sans">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
      </div>

      <div className="relative flex pt-20 items-center justify-center px-6">
        <div className="w-full max-w-7xl">
          <div className="rounded-3xl bg-white p-8 shadow-sm backdrop-blur sm:p-10">
            {/* badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              Kydimac - Platform Belajar Coding Bahasa Indonesia
            </div>

            {/* heading */}
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              FullStack Next.js
            </h1>

            {/* description */}
            <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
              Belajar Fulltack Developer Modern:{" "}
              <span className="font-medium text-zinc-800">Next.js</span>,{" "}
              <span className="font-medium text-zinc-800">Auth</span>,{" "}
              <span className="font-medium text-zinc-800">TypeScript</span>,{" "}
              <span className="font-medium text-zinc-800">Prisma ORM</span>, dan{" "}
              <span className="font-medium text-zinc-800">Tailwind CSS</span>
            </p>

            {/* actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
              >
                Create account
              </Link>

              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              >
                Sign in
              </Link>
            </div>

            {/* footer hint */}
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <span className="rounded-full bg-zinc-100 px-3 py-1">Prisma ORM</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1">MySQL</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1">Auth</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1">TypeScript</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1">Server Actions</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1">Tailwind CSS</span>
              <span className="ml-auto hidden sm:inline">
                {/* © {new Date().getFullYear()} */}
                © 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
