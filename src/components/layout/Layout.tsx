import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-svh overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent,rgba(99,102,241,0.03)),radial-gradient(circle_at_20%_0%,rgba(99,102,241,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.08),transparent_35%)] dark:bg-[linear-gradient(to_bottom,transparent,rgba(99,102,241,0.06)),radial-gradient(circle_at_20%_0%,rgba(99,102,241,0.18),transparent_45%)]"
      />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">{children}</div>
    </div>
  );
}
