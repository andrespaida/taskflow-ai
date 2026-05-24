import { motion } from 'framer-motion';
import type { TaskFilter } from '../../types/task';
import { FILTER_OPTIONS } from '../../constants/filters';

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export function TaskFilters({ filter, onFilterChange }: TaskFiltersProps) {
  return (
    <div
      className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800/80"
      role="radiogroup"
      aria-label="Filter tasks"
    >
      {FILTER_OPTIONS.map((option) => {
        const isActive = filter === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onFilterChange(option.value)}
            className={`relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors focus-ring ${
              isActive
                ? 'text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-lg bg-brand-600 shadow-sm dark:bg-brand-500"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
