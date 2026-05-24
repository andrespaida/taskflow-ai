import type { Task, TaskFilter, TaskStats } from '../types/task';

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.completed);
    case 'completed':
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
}

export function searchTasks(tasks: Task[], query: string): Task[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return tasks;

  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(normalized) ||
      task.description.toLowerCase().includes(normalized),
  );
}

export function getTaskStats(tasks: Task[]): TaskStats {
  const completed = tasks.filter((task) => task.completed).length;
  const total = tasks.length;

  return {
    total,
    active: total - completed,
    completed,
    progress: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}
