import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../../components/layout/Layout';
import { Header } from '../../components/layout/Header';
import { TaskForm } from '../../components/tasks/TaskForm';
import { TaskList } from '../../components/tasks/TaskList';
import { EditTaskModal } from '../../components/tasks/EditTaskModal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LiveRegion } from '../../components/ui/LiveRegion';
import { useLiveAnnouncer } from '../../hooks/useLiveAnnouncer';
import { useTasks, useTheme } from '../../hooks';
import type { Task } from '../../types/task';
import { StatsOverview } from './StatsOverview';
import { TaskToolbar } from './TaskToolbar';

type ConfirmState =
  | { type: 'delete'; id: string; title: string }
  | { type: 'clear'; count: number }
  | null;

export function TaskBoard() {
  const { theme, isDark, toggleTheme } = useTheme();
  const {
    tasks,
    totalCount,
    filter,
    searchQuery,
    stats,
    enableLayoutAnimation,
    setFilter,
    setSearchQuery,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
  } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState>(null);
  const { message, announce } = useLiveAnnouncer();

  const handleAddTask: typeof addTask = (input) => {
    const task = addTask(input);
    announce(`Task "${task.title}" added`);
    return task;
  };

  const handleToggle = (id: string) => {
    const task = tasks.find((item) => item.id === id);
    toggleTask(id);
    if (task) {
      announce(`Task "${task.title}" marked as ${task.completed ? 'active' : 'completed'}`);
    }
  };

  const handleConfirmDelete = () => {
    if (confirmState?.type !== 'delete') return;
    deleteTask(confirmState.id);
    announce(`Task "${confirmState.title}" deleted`);
    setConfirmState(null);
  };

  const handleConfirmClear = () => {
    if (confirmState?.type !== 'clear') return;
    clearCompleted();
    announce(`${confirmState.count} completed task${confirmState.count === 1 ? '' : 's'} removed`);
    setConfirmState(null);
  };

  return (
    <Layout>
      <LiveRegion message={message} />
      <Header isDark={isDark} onToggleTheme={toggleTheme} />

      <motion.main
        id="main-content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        <StatsOverview stats={stats} />

        <TaskForm onSubmit={handleAddTask} />

        <TaskToolbar
          filter={filter}
          searchQuery={searchQuery}
          completedCount={stats.completed}
          onFilterChange={setFilter}
          onSearchChange={setSearchQuery}
          onClearCompleted={() =>
            setConfirmState({ type: 'clear', count: stats.completed })
          }
        />

        <TaskList
          tasks={tasks}
          totalCount={totalCount}
          filter={filter}
          searchQuery={searchQuery}
          enableLayoutAnimation={enableLayoutAnimation}
          onToggle={handleToggle}
          onEdit={setEditingTask}
          onDeleteRequest={(task) =>
            setConfirmState({ type: 'delete', id: task.id, title: task.title })
          }
        />
      </motion.main>

      <EditTaskModal
        task={editingTask}
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSave={(id, updates) => {
          updateTask(id, updates);
          announce('Task updated');
        }}
      />

      <ConfirmDialog
        open={confirmState?.type === 'delete'}
        title="Delete task?"
        description={`"${confirmState?.type === 'delete' ? confirmState.title : ''}" will be permanently removed.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmState(null)}
      />

      <ConfirmDialog
        open={confirmState?.type === 'clear'}
        title="Clear completed tasks?"
        description={`Remove ${confirmState?.type === 'clear' ? confirmState.count : 0} completed task${confirmState?.type === 'clear' && confirmState.count === 1 ? '' : 's'}? This cannot be undone.`}
        confirmLabel="Clear all"
        variant="danger"
        onConfirm={handleConfirmClear}
        onCancel={() => setConfirmState(null)}
      />

      <footer className="mt-10 border-t border-slate-200/80 pt-6 text-center text-xs text-muted dark:border-slate-800">
        TaskFlow · {theme} mode · Stored locally in your browser
      </footer>
    </Layout>
  );
}
