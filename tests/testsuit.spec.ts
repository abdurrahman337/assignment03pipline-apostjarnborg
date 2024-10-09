import { test, expect } from '@playwright/test';

test.describe('Front-end tests', () => {

  test.describe('Test suite 01', () => {
    test('Create a client', async ({ page }) => {
      await page.goto('http://localhost:3000'); // Ensure the correct port number
      await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
      await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
      await page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link').click();
      await page.waitForTimeout(4000);
      await page.getByRole('link', { name: 'Create Client' }).click();
      await page.waitForTimeout(4000);
      await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Alex');
      await page.locator('input[type="email"]').fill('alex.b@hotmail.se');
      await page
        .locator('div')
        .filter({ hasText: /^Telephone$/ })
        .getByRole('textbox')
        .fill('0755885555');
      await page.getByText('Save').click();
      await page.waitForTimeout(4000);
      const thirdImage = page.getByRole('img').nth(2);
      await expect(thirdImage).toBeVisible(); // Kontrollera att bilden är synlig
      // Verifiera att rubriken 'Alex (#3)' är synlig
      const clientHeading = page.getByRole('heading', { name: 'Alex (#3)' });
      await expect(clientHeading).toBeVisible();





    });
  });

});

