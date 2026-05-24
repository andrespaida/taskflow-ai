import { useState, type FormEvent } from 'react';
import type { Task, TaskPriority } from '../../types/task';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { PrioritySelector } from '../ui/PrioritySelector';

interface EditTaskModalProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
}

interface EditTaskFormProps {
  task: Task;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
}

function EditTaskForm({ task, onClose, onSave }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Task title is required');
      return;
    }
    onSave(task.id, { title: trimmed, description: description.trim(), priority });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="edit-title"
        label="Title"
        value={title}
        error={error}
        onChange={(event) => {
          setTitle(event.target.value);
          if (error) setError('');
        }}
      />
      <Textarea
        id="edit-description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Priority</p>
        <PrioritySelector value={priority} onChange={setPriority} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}

export function EditTaskModal({ task, open, onClose, onSave }: EditTaskModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Edit task">
      {task && <EditTaskForm key={task.id} task={task} onSave={onSave} onClose={onClose} />}
    </Modal>
  );
}
