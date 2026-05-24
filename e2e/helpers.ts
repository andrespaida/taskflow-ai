import type { Page } from '@playwright/test';
import { STORAGE_KEYS } from '../src/constants/filters';

export async function resetAppState(page: Page) {
  await page.goto('/');
  await page.evaluate((keys) => {
    localStorage.setItem(keys.theme, 'light');
    localStorage.removeItem(keys.tasks);
    localStorage.removeItem(keys.filter);
    document.documentElement.classList.remove('dark');
  }, STORAGE_KEYS);
  await page.reload();
  await page.waitForSelector('#main-content');
}

export async function createTask(
  page: Page,
  options: {
    title: string;
    description?: string;
    priority?: 'Low' | 'Medium' | 'High';
  },
) {
  const titleInput = page.getByPlaceholder('What needs to be done?');
  await titleInput.click();
  await titleInput.fill(options.title);

  const taskForm = page.locator('form').filter({ has: page.locator('#task-title') });

  if (options.description) {
    await taskForm.getByLabel('Description').fill(options.description);
  }

  if (options.priority) {
    await taskForm.getByRole('button', { name: options.priority, exact: true }).click();
  }

  await page.getByRole('button', { name: 'Add task' }).click();
  await page.getByRole('heading', { level: 3, name: options.title }).waitFor();
}

export async function isDarkMode(page: Page): Promise<boolean> {
  return page.evaluate(() => document.documentElement.classList.contains('dark'));
}

export function taskInList(page: Page, title: string) {
  return page.getByRole('heading', { level: 3, name: title });
}
