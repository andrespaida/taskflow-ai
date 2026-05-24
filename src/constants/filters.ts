import type { TaskFilter, TaskPriority } from '../types/task';

export const FILTER_OPTIONS: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export const PRIORITY_OPTIONS: {
  value: TaskPriority;
  label: string;
  color: string;
  accent: string;
  ring: string;
}[] = [
  {
    value: 'low',
    label: 'Low',
    color: 'text-emerald-700 dark:text-emerald-400',
    accent: 'border-l-emerald-500',
    ring: 'ring-emerald-500/30',
  },
  {
    value: 'medium',
    label: 'Medium',
    color: 'text-amber-700 dark:text-amber-400',
    accent: 'border-l-amber-500',
    ring: 'ring-amber-500/30',
  },
  {
    value: 'high',
    label: 'High',
    color: 'text-rose-700 dark:text-rose-400',
    accent: 'border-l-rose-500',
    ring: 'ring-rose-500/30',
  },
];

export const STORAGE_KEYS = {
  tasks: 'taskflow-tasks',
  theme: 'taskflow-theme',
  filter: 'taskflow-filter',
} as const;

export function getPriorityOption(priority: TaskPriority) {
  return PRIORITY_OPTIONS.find((option) => option.value === priority)!;
}
