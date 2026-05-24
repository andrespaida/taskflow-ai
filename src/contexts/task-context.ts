import { createContext } from 'react';
import type { Task, TaskFilter, TaskInput, TaskStats } from '../types/task';

export interface TaskContextValue {
  tasks: Task[];
  totalCount: number;
  filter: TaskFilter;
  searchQuery: string;
  stats: TaskStats;
  setFilter: (filter: TaskFilter) => void;
  setSearchQuery: (query: string) => void;
  addTask: (input: TaskInput) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearCompleted: () => void;
}

export const TaskContext = createContext<TaskContextValue | null>(null);
