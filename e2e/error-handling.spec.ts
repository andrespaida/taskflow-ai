import { test, expect } from '@playwright/test';
import { createTask, resetAppState, taskInList } from './helpers';
import { STORAGE_KEYS } from '../src/constants/filters';

test.describe('Error handling tests', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('shows validation error when submitting empty title', async ({ page }) => {
    await page.getByRole('button', { name: 'Add task' }).click();

    await expect(page.getByRole('alert')).toHaveText('Task title is required');
    await expect(page.getByPlaceholder('What needs to be done?')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByText('No tasks yet')).toBeVisible();
  });

  test('shows validation error for whitespace-only title', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('   ');
    await page.getByRole('button', { name: 'Add task' }).click();

    await expect(page.getByRole('alert')).toHaveText('Task title is required');
  });

  test('clears validation error when user starts typing', async ({ page }) => {
    await page.getByRole('button', { name: 'Add task' }).click();
    await expect(page.getByRole('alert')).toBeVisible();

    await page.getByPlaceholder('What needs to be done?').fill('Valid task');
    await expect(page.getByRole('alert')).not.toBeVisible();
  });

  test('shows validation error when editing task with empty title', async ({ page }) => {
    await createTask(page, { title: 'Editable task' });

    await page.getByRole('button', { name: 'Edit Editable task' }).click();
    const dialog = page.getByRole('dialog', { name: 'Edit task' });
    await dialog.getByRole('textbox', { name: 'Title' }).fill('');
    await dialog.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.getByRole('alert')).toHaveText('Task title is required');
    await expect(page.getByRole('dialog', { name: 'Edit task' })).toBeVisible();
  });

  test('cancels delete and keeps the task', async ({ page }) => {
    await createTask(page, { title: 'Do not delete' });

    await page.getByRole('button', { name: 'Delete Do not delete' }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(taskInList(page, 'Do not delete')).toBeVisible();
  });

  test('recovers from corrupt localStorage task data', async ({ page }) => {
    await page.goto('/');
    await page.evaluate((key) => {
      localStorage.setItem(key, '{ invalid json');
    }, STORAGE_KEYS.tasks);
    await page.reload();
    await page.waitForSelector('#main-content');

    await expect(page.getByText('No tasks yet')).toBeVisible();

    await page.getByPlaceholder('What needs to be done?').fill('Recovery task');
    await page.getByRole('button', { name: 'Add task' }).click();
    await expect(taskInList(page, 'Recovery task')).toBeVisible();
  });

  test('ignores invalid tasks in localStorage and loads valid ones', async ({ page }) => {
    await page.goto('/');
    await page.evaluate((key) => {
      localStorage.setItem(
        key,
        JSON.stringify([
          { id: '1', title: 'Valid task', completed: false, priority: 'medium' },
          { id: '', title: '', completed: false },
          null,
        ]),
      );
    }, STORAGE_KEYS.tasks);
    await page.reload();
    await page.waitForSelector('#main-content');

    await expect(taskInList(page, 'Valid task')).toBeVisible();
    await expect(page.getByRole('list', { name: 'Task list' }).getByRole('listitem')).toHaveCount(1);
  });
});
