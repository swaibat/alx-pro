import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('http://localhost:8081/');
  await page.getByTestId('account').waitFor({ state: 'visible' });
  await page.getByTestId('account').click();
  await expect(page.getByTestId('register-btn')).toBeVisible();
  await expect(page.getByTestId('forgot-btn')).toBeVisible();
  //test wrong password
  await page.getByTestId('@phone/input').fill('766389284');
  await page.getByTestId('@password/input').fill('password');
  await page.getByTestId('login-btn').click();
  await expect(page.getByTestId('login-btn')).toHaveText('Logging in...');
  await page.waitForSelector('[data-testid="toast"]');
  await expect(page.getByTestId('toast')).toHaveText('Invalid credentials');
  await page.getByTestId('close-toast').click();
  //success Login
  await page.getByTestId('@phone/input').fill('766389284');
  await page.getByTestId('@password/input').fill('Password');
  await page.getByTestId('login-btn').click();
  await expect(page.getByTestId('login-btn')).toHaveText('Logging in...');
  await page.waitForSelector('[data-testid="toast"]');
  await expect(page.getByTestId('toast')).toHaveText('Login Successful!');
});
