import type { ReactNode } from "react";

type PageHeaderProps = {
    title: string;
    subtitle?: string;
    action?: ReactNode; // opsional
};

export default function PageHeader({
    title,
    subtitle,
    action,
}: PageHeaderProps) {
    return (
        <div className="mb-6 flex items-center justify-between border-b border-zinc-200 pb-4">
            <div>
                <h1 className="text-xl font-bold text-zinc-900">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-1 text-sm text-zinc-500">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Button / Action (optional) */}
            {action && <div>{action}</div>}
        </div>
    );
}
