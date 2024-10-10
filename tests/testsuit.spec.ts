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


    /*
        test('Create a Room', async ({ page }) => {
          await page.goto('http://localhost:3000'); // Ensure the correct port number
          await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
          await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
          await page.getByRole('button', { name: 'Login' }).click();
          await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
          await page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ }).getByRole('link').click();
          await page.waitForTimeout(4000);
          // Klicka på länken för att skapa ett nytt rum
          await page.getByRole('link', { name: 'Create Room' }).click();
          await page.waitForTimeout(4000); // Vänta för att säkerställa att sidan är laddad
    
          // Hämta kombinationsfältet för rumsalternativ
          const select = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > select');
    
          // Välj det andra alternativet (t.ex. "triple")
          await select.selectOption({ index: 1 }); // Välj det andra alternativet (index 1)
    
          // Hämta texten för det valda alternativet
          const selectedOption = await select.locator('option:checked').innerText();
          console.log('Valt alternativ:', selectedOption);
          await expect(selectedOption).toBe(' Single ');
          await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').fill('3');
          await page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').fill('3');
          await page.waitForTimeout(4000); // Vänta för att säkerställa att sidan är laddad
          await page.locator('.checkbox').check();
    
    
    
        });*/
  });

});

