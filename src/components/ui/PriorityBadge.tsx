import type { TaskPriority } from '../../types/task';
import { getPriorityOption } from '../../constants/filters';

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const bgMap = {
  low: 'bg-emerald-50 dark:bg-emerald-950/40',
  medium: 'bg-amber-50 dark:bg-amber-950/40',
  high: 'bg-rose-50 dark:bg-rose-950/40',
} as const;

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const option = getPriorityOption(priority);

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${option.color} ${bgMap[priority]}`}
    >
      {option.label}
    </span>
  );
}
