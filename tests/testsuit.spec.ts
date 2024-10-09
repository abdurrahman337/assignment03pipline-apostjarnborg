import { test, expect } from '@playwright/test';

test.describe('Front-end tests', () => {

  test.describe('Test suite 01', () => {
    test('Create a client', async ({ page }) => {
      await page.goto('http://localhost:3000'); // Ensure the correct port number
      await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
      await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
      await page.getByRole('button', { name: 'Login' }).click();
    





    });
  });

});

