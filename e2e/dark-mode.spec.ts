import { test, expect } from '@playwright/test';
import { isDarkMode, resetAppState } from './helpers';

test.describe('Dark mode tests', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('starts in light mode by default when no preference is stored', async ({ page }) => {
    await expect(await isDarkMode(page)).toBe(false);
    await expect(
      page.getByRole('button', { name: 'Switch to dark mode' }),
    ).toBeVisible();
  });

  test('toggles to dark mode and updates the UI', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();

    await expect(await isDarkMode(page)).toBe(true);
    await expect(
      page.getByRole('button', { name: 'Switch to light mode' }),
    ).toBeVisible();
    await expect(page.getByText('dark mode')).toBeVisible();
  });

  test('toggles back to light mode', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    await page.getByRole('button', { name: 'Switch to light mode' }).click();

    await expect(await isDarkMode(page)).toBe(false);
    await expect(page.getByText('light mode')).toBeVisible();
  });

  test('persists dark mode preference in localStorage', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    await page.reload();
    await page.waitForSelector('#main-content');

    await expect(await isDarkMode(page)).toBe(true);
    await expect(
      page.getByRole('button', { name: 'Switch to light mode' }),
    ).toBeVisible();
  });

  test('persists light mode after toggling off dark mode', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    await page.getByRole('button', { name: 'Switch to light mode' }).click();
    await page.reload();
    await page.waitForSelector('#main-content');

    await expect(await isDarkMode(page)).toBe(false);
  });
});
