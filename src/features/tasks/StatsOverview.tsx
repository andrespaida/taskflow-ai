import { motion } from 'framer-motion';
import { CheckCircle2, CircleDashed, ListTodo } from 'lucide-react';
import type { TaskStats } from '../../types/task';

interface StatsOverviewProps {
  stats: TaskStats;
}

const cards = [
  { key: 'total', label: 'Total tasks', icon: ListTodo, getValue: (s: TaskStats) => s.total },
  { key: 'active', label: 'In progress', icon: CircleDashed, getValue: (s: TaskStats) => s.active },
  { key: 'completed', label: 'Completed', icon: CheckCircle2, getValue: (s: TaskStats) => s.completed },
] as const;

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <section className="mb-6 grid gap-3 sm:grid-cols-3" aria-label="Task statistics">
      {cards.map(({ key, label, icon: Icon, getValue }, index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.35 }}
          className="surface-card p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-900 dark:text-white">
                {getValue(stats)}
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400">
              <Icon className="h-4 w-4" />
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="surface-card col-span-full p-4 sm:col-span-3"
      >
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-300">Completion rate</span>
          <span className="tabular-nums text-muted">{stats.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stats.progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600"
          />
        </div>
      </motion.div>
    </section>
  );
}
