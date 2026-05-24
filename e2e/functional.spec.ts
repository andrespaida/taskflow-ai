import { test, expect } from '@playwright/test';
import { createTask, resetAppState, taskInList } from './helpers';

test.describe('Functional tests', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('loads the application with empty state', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'TaskFlow', level: 1 })).toBeVisible();
    await expect(page.getByText('No tasks yet')).toBeVisible();
    await expect(page.getByRole('region', { name: 'Task statistics' })).toBeVisible();
  });

  test('completes and filters tasks', async ({ page }) => {
    await createTask(page, { title: 'Active task' });
    await createTask(page, { title: 'Done task' });

    await page.getByRole('checkbox', { name: 'Mark "Done task" as complete' }).click();

    await page.getByRole('radio', { name: 'Active' }).click();
    await expect(taskInList(page, 'Active task')).toBeVisible();
    await expect(taskInList(page, 'Done task')).not.toBeVisible();

    await page.getByRole('radio', { name: 'Done' }).click();
    await expect(taskInList(page, 'Done task')).toBeVisible();
    await expect(taskInList(page, 'Active task')).not.toBeVisible();
  });

  test('searches tasks by title', async ({ page }) => {
    await createTask(page, { title: 'Buy groceries' });
    await createTask(page, { title: 'Write report' });

    await page.getByRole('searchbox', { name: 'Search tasks' }).fill('report');

    await expect(taskInList(page, 'Write report')).toBeVisible();
    await expect(taskInList(page, 'Buy groceries')).not.toBeVisible();
  });

  test('deletes a task after confirmation', async ({ page }) => {
    await createTask(page, { title: 'Task to delete' });

    await page.getByRole('button', { name: 'Delete Task to delete' }).click();
    await expect(page.getByRole('dialog', { name: 'Delete task?' })).toBeVisible();

    await page.getByRole('dialog', { name: 'Delete task?' }).getByRole('button', { name: 'Delete' }).click();
    await expect(taskInList(page, 'Task to delete')).not.toBeVisible();
    await expect(page.getByText('No tasks yet')).toBeVisible();
  });

  test('clears completed tasks after confirmation', async ({ page }) => {
    await createTask(page, { title: 'Keep me' });
    await createTask(page, { title: 'Remove me' });

    await page.getByRole('checkbox', { name: 'Mark "Remove me" as complete' }).click();
    await page.getByRole('button', { name: 'Clear completed' }).click();

    await expect(page.getByRole('dialog', { name: 'Clear completed tasks?' })).toBeVisible();
    await page.getByRole('button', { name: 'Clear all' }).click();

    await expect(taskInList(page, 'Keep me')).toBeVisible();
    await expect(taskInList(page, 'Remove me')).not.toBeVisible();
  });

  test('edits a task in the modal', async ({ page }) => {
    await createTask(page, { title: 'Original title' });

    await page.getByRole('button', { name: 'Edit Original title' }).click();
    await expect(page.getByRole('dialog', { name: 'Edit task' })).toBeVisible();

    const dialog = page.getByRole('dialog', { name: 'Edit task' });
    await dialog.getByRole('textbox', { name: 'Title' }).fill('Updated title');
    await dialog.getByRole('button', { name: 'Save changes' }).click();

    await expect(taskInList(page, 'Updated title')).toBeVisible();
    await expect(taskInList(page, 'Original title')).not.toBeVisible();
  });

  test('persists tasks after reload', async ({ page }) => {
    await createTask(page, { title: 'Persisted task' });
    await page.reload();
    await page.waitForSelector('#main-content');

    await expect(taskInList(page, 'Persisted task')).toBeVisible();
  });
});
