import { useEffect, useState } from 'react';
import { writeStorage } from '../utils/storage';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  parse?: (value: unknown) => T,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initialValue;
      const parsed: unknown = JSON.parse(raw);
      return parse ? parse(parsed) : (parsed as T);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          const parsed: unknown = JSON.parse(event.newValue);
          setValue(parse ? parse(parsed) : (parsed as T));
        } catch {
          // ignore malformed cross-tab payloads
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, parse]);

  return [value, setValue] as const;
}
