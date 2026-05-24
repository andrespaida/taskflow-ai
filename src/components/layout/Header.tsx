import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between gap-4"
      >
        <motion.div className="flex items-center gap-3.5">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 shadow-lg shadow-brand-600/25">
            <Sparkles className="h-5 w-5 text-white" />
            <motion.div className="absolute -inset-0.5 -z-10 rounded-2xl bg-brand-500/20 blur-md" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
              Productivity
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-[1.75rem]">
              TaskFlow
            </h1>
            <p className="text-sm text-muted">Plan, prioritize, and ship with clarity</p>
          </div>
        </motion.div>

        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </motion.div>
    </header>
  );
}
