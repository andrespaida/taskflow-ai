import { test, expect } from '@playwright/test';
import { createTask, resetAppState, taskInList } from './helpers';

test.describe('Task creation tests', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('creates a task with title only', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('Simple task');
    await page.getByRole('button', { name: 'Add task' }).click();

    await expect(taskInList(page, 'Simple task')).toBeVisible();
    await expect(page.getByText('No tasks yet')).not.toBeVisible();
  });

  test('creates a task with description and priority', async ({ page }) => {
    await createTask(page, {
      title: 'Detailed task',
      description: 'Important context for the task',
      priority: 'High',
    });

    await expect(taskInList(page, 'Detailed task')).toBeVisible();

    const taskItem = page.getByRole('listitem').filter({ hasText: 'Detailed task' });
    await expect(taskItem.getByText('Important context for the task')).toBeVisible();
    await expect(taskItem.getByText('HIGH')).toBeVisible();
  });

  test('clears the form after successful submission', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('One-time task');
    await page.getByRole('button', { name: 'Add task' }).click();

    await expect(page.getByPlaceholder('What needs to be done?')).toHaveValue('');
  });

  test('updates stats after creating tasks', async ({ page }) => {
    await createTask(page, { title: 'First task' });
    await createTask(page, { title: 'Second task' });

    const statsSection = page.getByRole('region', { name: 'Task statistics' });
    await expect(statsSection.getByText('Total tasks').locator('..').getByText('2')).toBeVisible();
  });

  test('creates multiple tasks and lists them all', async ({ page }) => {
    const titles = ['Task A', 'Task B', 'Task C'];

    for (const title of titles) {
      await createTask(page, { title });
    }

    for (const title of titles) {
      await expect(taskInList(page, title)).toBeVisible();
    }

    await expect(page.getByRole('list', { name: 'Task list' }).getByRole('listitem')).toHaveCount(3);
  });

  test('expands details when title input is focused', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').focus();

    await expect(page.getByLabel('Description')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Hide details' })).toBeVisible();
  });
});
