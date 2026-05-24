import { useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { ThemeContext, type Theme } from '../contexts/theme-context';
import { STORAGE_KEYS } from '../constants/filters';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useLocalStorage<Theme>(
    STORAGE_KEYS.theme,
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  const setTheme = useCallback(
    (next: Theme) => setThemeState(next),
    [setThemeState],
  );

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setThemeState]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
