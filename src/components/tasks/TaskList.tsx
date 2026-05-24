import { AnimatePresence, motion } from 'framer-motion';
import { ClipboardList, SearchX } from 'lucide-react';
import type { Task, TaskFilter } from '../../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  totalCount: number;
  filter: TaskFilter;
  searchQuery: string;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="surface-card flex flex-col items-center justify-center px-6 py-16 text-center"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <Icon className="h-7 w-7 text-slate-400" />
      </div>
      <p className="text-base font-medium text-slate-700 dark:text-slate-200">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
    </motion.div>
  );
}

export function TaskList({
  tasks,
  totalCount,
  filter,
  searchQuery,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    const hasFilters = filter !== 'all' || searchQuery.trim().length > 0;

    if (totalCount === 0) {
      return (
        <EmptyState
          icon={ClipboardList}
          title="No tasks yet"
          description="Create your first task above to start organizing your work."
        />
      );
    }

    if (hasFilters) {
      return (
        <EmptyState
          icon={SearchX}
          title="No matching tasks"
          description="Try adjusting your search or filter to find what you're looking for."
        />
      );
    }
  }

  return (
    <ul className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
