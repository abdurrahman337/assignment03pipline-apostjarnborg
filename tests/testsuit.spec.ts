import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';


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
      await page.waitForTimeout(4000);
      // Hämta kombinationsfältet för rumsalternativ
      const select = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > select');
      await select.selectOption({ index: 1 }); // Välj det andra alternativet (index 1)
      const selectedOption = await select.locator('option:checked').innerText();
      console.log('Valt alternativ:', selectedOption);
      await expect(selectedOption).toBe(' Single ');
      await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').fill('3');
      await page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').fill('3');
      await page.waitForTimeout(4000);
      await page.locator('.checkbox').click();
      // Optionally, verify if the checkbox action was successful
      const checkboxChecked = await page.locator('.checkbox').evaluate(div => {
        return div.classList.contains('checked'); // Adjust this check based on your CSS class
      });
      await page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').fill('3500');
      const selectFeatures = page.locator('select[multiple="multiple"]');
      await selectFeatures.selectOption('sea_view');
      await page.getByText('Save').click();
      await page.waitForTimeout(4000);
      const heading = await page.getByRole('heading', { name: 'Floor 3, Room' });
      await expect(heading).toBeVisible();




    });

  });
});

dotenv.config(); // Laddar miljövariabler från .env-fil
const BASE_URL = process.env.BASE_URL || "http://localhost:3000"; // Fallback

test.describe('Backend tests', () => {
  let tokenValue: string;

  test.beforeAll('Test case LogInGetToken', async ({ request }) => {
    const respToken = await request.post(`${BASE_URL}/api/login`, { // Använd BASE_URL
      data: {
        username: "tester01",
        password: "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
      }
    });

    expect(respToken.ok()).toBeTruthy(); // Kontrollera att inloggningen var lyckad
    tokenValue = (await respToken.json()).token;
  });

  test('Test case 01 - Hämta alla rum', async ({ request }) => {
    const respRooms = await request.get("http://localhost:3000/api/rooms", {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue
        })
      },
    });

    expect(respRooms.ok()).toBeTruthy();
    expect(respRooms.status()).toBe(200);
    const rooms = await respRooms.json();
    expect(Array.isArray(rooms)).toBe(true);

    rooms.forEach(room => {
      expect(room).toHaveProperty('id');
      expect(room).toHaveProperty('created');
      expect(room).toHaveProperty('category');
      expect(room).toHaveProperty('floor');
      expect(room).toHaveProperty('number');
      expect(room).toHaveProperty('available');
      expect(room).toHaveProperty('price');
      expect(room).toHaveProperty('features');
      expect(Array.isArray(room.features)).toBe(true);
    });
  });

  test('Test case 03 - Get all clients', async ({ request }) => {
    const respRooms = await request.get(`${BASE_URL}/api/clients`, {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue
        })
      },
    });

    console.log(await respRooms.json())
    const rooms = await respRooms.json();
    expect(await respRooms.ok());
  });

  test('Test case 04 - Create Client', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/client/new`, {
      headers: {
        'X-user-auth': JSON.stringify({
          username: 'tester01',
          token: tokenValue
        }),
        'Content-Type': 'application/json'
      },
      data: {
        "name": "Alex sixten",
        "email": "alex.sixten@hotmail.se",
        "telephone": "1234567"
      }

    });
    expect(response.ok()).toBeTruthy();
  });
});