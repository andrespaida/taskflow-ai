import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { getPriorityOption } from '../../constants/filters';
import type { Task } from '../../types/task';
import { formatRelativeTime } from '../../utils/taskHelpers';
import { Checkbox } from '../ui/Checkbox';
import { PriorityBadge } from '../ui/PriorityBadge';
import { Button } from '../ui/Button';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const priority = getPriorityOption(task.priority);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      className={`group surface-card border-l-[3px] p-4 ${priority.accent} ${
        task.completed ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-medium text-slate-900 dark:text-white ${
                task.completed ? 'line-through decoration-slate-400' : ''
              }`}
            >
              {task.title}
            </h3>
            <PriorityBadge priority={task.priority} />
          </div>

          {task.description && (
            <p
              className={`mt-1.5 text-sm leading-relaxed text-muted ${
                task.completed ? 'line-through' : ''
              }`}
            >
              {task.description}
            </p>
          )}

          <p className="mt-2.5 text-xs text-muted">{formatRelativeTime(task.updatedAt)}</p>
        </div>

        <div className="flex shrink-0 gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
            className="text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.li>
  );
}
