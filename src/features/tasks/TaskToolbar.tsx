import { Trash2 } from 'lucide-react';
import type { TaskFilter } from '../../types/task';
import { TaskFilters } from '../../components/tasks/TaskFilters';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';

interface TaskToolbarProps {
  filter: TaskFilter;
  searchQuery: string;
  completedCount: number;
  onFilterChange: (filter: TaskFilter) => void;
  onSearchChange: (query: string) => void;
  onClearCompleted: () => void;
}

export function TaskToolbar({
  filter,
  searchQuery,
  completedCount,
  onFilterChange,
  onSearchChange,
  onClearCompleted,
}: TaskToolbarProps) {
  return (
    <div className="surface-card mb-4 space-y-3 p-3 sm:p-4">
      <SearchInput
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        onClear={() => onSearchChange('')}
        aria-label="Search tasks"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TaskFilters filter={filter} onFilterChange={onFilterChange} />

        {completedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCompleted}
            className="self-start text-muted hover:text-rose-600 dark:hover:text-rose-400"
          >
            <Trash2 className="h-4 w-4" />
            Clear completed
          </Button>
        )}
      </div>
    </div>
  );
}
