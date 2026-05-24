import type { ReactNode } from 'react';
import { TaskProvider } from './TaskProvider';
import { ThemeProvider } from './ThemeProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TaskProvider>{children}</TaskProvider>
    </ThemeProvider>
  );
}
