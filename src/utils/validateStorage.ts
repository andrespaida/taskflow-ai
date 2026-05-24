import type { Task, TaskFilter, TaskPriority } from '../types/task';
import { FILTER_OPTIONS } from '../constants/filters';

const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high'];
const FILTERS: TaskFilter[] = ['all', 'active', 'completed'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isPriority(value: unknown): value is TaskPriority {
  return typeof value === 'string' && PRIORITIES.includes(value as TaskPriority);
}

export function parseTasks(raw: unknown): Task[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter(isRecord)
    .map((item): Task | null => {
      const id = typeof item.id === 'string' ? item.id : '';
      const title = typeof item.title === 'string' ? item.title.trim() : '';
      if (!id || !title) return null;

      return {
        id,
        title,
        description: typeof item.description === 'string' ? item.description : '',
        completed: Boolean(item.completed),
        priority: isPriority(item.priority) ? item.priority : 'medium',
        createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
        updatedAt: typeof item.updatedAt === 'string' ? item.updatedAt : new Date().toISOString(),
      };
    })
    .filter((task): task is Task => task !== null);
}

export function parseFilter(raw: unknown): TaskFilter {
  if (typeof raw === 'string' && FILTERS.includes(raw as TaskFilter)) {
    return raw as TaskFilter;
  }
  return FILTER_OPTIONS[0]?.value ?? 'all';
}

export function parseTasksFromStorage(key: string): Task[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return parseTasks(JSON.parse(raw));
  } catch {
    return [];
  }
}
