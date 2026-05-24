import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../../components/layout/Layout';
import { Header } from '../../components/layout/Header';
import { TaskForm } from '../../components/tasks/TaskForm';
import { TaskList } from '../../components/tasks/TaskList';
import { EditTaskModal } from '../../components/tasks/EditTaskModal';
import { useTasks, useTheme } from '../../hooks';
import type { Task } from '../../types/task';
import { StatsOverview } from './StatsOverview';
import { TaskToolbar } from './TaskToolbar';

export function TaskBoard() {
  const { theme, isDark, toggleTheme } = useTheme();
  const {
    tasks,
    totalCount,
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
  } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <Layout>
      <Header isDark={isDark} onToggleTheme={toggleTheme} />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        <StatsOverview stats={stats} />

        <TaskForm onSubmit={addTask} />

        <TaskToolbar
          filter={filter}
          searchQuery={searchQuery}
          completedCount={stats.completed}
          onFilterChange={setFilter}
          onSearchChange={setSearchQuery}
          onClearCompleted={clearCompleted}
        />

        <TaskList
          tasks={tasks}
          totalCount={totalCount}
          filter={filter}
          searchQuery={searchQuery}
          onToggle={toggleTask}
          onEdit={setEditingTask}
          onDelete={deleteTask}
        />
      </motion.main>

      <EditTaskModal
        task={editingTask}
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSave={updateTask}
      />

      <footer className="mt-10 border-t border-slate-200/80 pt-6 text-center text-xs text-muted dark:border-slate-800">
        TaskFlow · {theme} mode · Stored locally in your browser
      </footer>
    </Layout>
  );
}
