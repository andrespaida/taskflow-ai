import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type { TaskInput, TaskPriority } from '../../types/task';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { PrioritySelector } from '../ui/PrioritySelector';
import { Textarea } from '../ui/Textarea';

interface TaskFormProps {
  onSubmit: (input: TaskInput) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Task title is required');
      return;
    }

    onSubmit({ title: trimmed, description, priority });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setExpanded(false);
    setError('');
  };

  return (
    <Card className="mb-6" padding="md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">New task</h2>
          <p className="text-xs text-muted">Capture what you need to get done next</p>
        </div>
        {!expanded ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => setExpanded(true)}>
            Show details
          </Button>
        ) : (
          <Button type="button" variant="ghost" size="sm" onClick={() => setExpanded(false)}>
            Hide details
          </Button>
        )}
      </div>

      <motion.form layout onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex-1">
            <Input
              id="task-title"
              placeholder="What needs to be done?"
              value={title}
              error={error}
              maxLength={200}
              onChange={(event) => {
                setTitle(event.target.value);
                if (error) setError('');
              }}
              onFocus={() => setExpanded(true)}
            />
          </div>
          <Button type="submit" className="shrink-0">
            <Plus className="h-4 w-4" />
            Add task
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden border-t border-slate-200/80 pt-4 dark:border-slate-800"
            >
              <Textarea
                id="task-description"
                label="Description"
                placeholder="Add context, links, or notes..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <div>
                <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Priority</p>
                <PrioritySelector value={priority} onChange={setPriority} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </Card>
  );
}
