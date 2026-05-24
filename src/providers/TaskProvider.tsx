import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { TaskContext } from '../contexts/task-context';
import { STORAGE_KEYS } from '../constants/filters';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Task, TaskFilter, TaskInput } from '../types/task';
import { generateId } from '../utils/storage';
import { filterTasks, getTaskStats, searchTasks, sortTasks } from '../utils/taskHelpers';

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEYS.tasks, []);
  const [filter, setFilter] = useLocalStorage<TaskFilter>(STORAGE_KEYS.filter, 'all');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  const visibleTasks = useMemo(
    () => sortTasks(searchTasks(filterTasks(tasks, filter), searchQuery)),
    [tasks, filter, searchQuery],
  );

  const addTask = useCallback(
    (input: TaskInput) => {
      const now = new Date().toISOString();
      const task: Task = {
        id: generateId(),
        title: input.title.trim(),
        description: input.description?.trim() ?? '',
        priority: input.priority ?? 'medium',
        completed: false,
        createdAt: now,
        updatedAt: now,
      };
      setTasks((prev) => [task, ...prev]);
    },
    [setTasks],
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, ...updates, updatedAt: new Date().toISOString() }
            : task,
        ),
      );
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id: string) => setTasks((prev) => prev.filter((task) => task.id !== id)),
    [setTasks],
  );

  const toggleTask = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
            : task,
        ),
      );
    },
    [setTasks],
  );

  const clearCompleted = useCallback(
    () => setTasks((prev) => prev.filter((task) => !task.completed)),
    [setTasks],
  );

  const value = useMemo(
    () => ({
      tasks: visibleTasks,
      totalCount: tasks.length,
      filter,
      searchQuery,
      stats,
      setFilter,
      setSearchQuery,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      clearCompleted,
    }),
    [
      visibleTasks,
      tasks.length,
      filter,
      searchQuery,
      stats,
      setFilter,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      clearCompleted,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
