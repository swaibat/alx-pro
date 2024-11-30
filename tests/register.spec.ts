import { test, expect } from '@playwright/test';

test.describe('Register', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the OtpRegisterScreen page
    await page.goto('http://localhost:8081/register'); // Adjust the URL as needed
  });

  test('renders correctly', async ({ page }) => {
    // Check if specific elements are visible
    await expect(page.locator('text=Enter your phone number')).toBeVisible();
    await expect(page.locator('text=Next')).toBeVisible();
  });

  test('navigates to OTP input on phone number submission', async ({ page }) => {
    // Enter a phone number and click Next
    await page.fill('input[data-testid="phoneInput"]', '1234567890');
    await page.click('button[data-testid="nextButton"]');

    // Verify if the OTP input field is visible
    await expect(page.locator('text=Enter the OTP sent to your phone')).toBeVisible();
  });

  test('validates OTP input', async ({ page }) => {
    await page.fill('input[data-testid="phoneInput"]', '1234567890');
    await page.click('button[data-testid="nextButton"]');

    // Enter an OTP and click Verify
    await page.fill('input[data-testid="otpInput"]', '1234');
    await page.click('button[data-testid="verifyOtpButton"]');

    // Verify if the registration step is displayed
    await expect(page.locator('text=Register')).toBeVisible();
  });

  test('registers a new user', async ({ page }) => {
    await page.fill('input[data-testid="phoneInput"]', '1234567890');
    await page.click('button[data-testid="nextButton"]');

    await page.fill('input[data-testid="otpInput"]', '1234');
    await page.click('button[data-testid="verifyOtpButton"]');

    // Fill registration form and submit
    await page.fill('input[data-testid="fullNameInput"]', 'John Doe');
    await page.fill('input[data-testid="emailInput"]', 'johndoe@example.com');
    await page.fill('input[data-testid="passwordInput"]', 'password123');
    await page.click('button[data-testid="registerButton"]');

    // Verify successful registration
    await expect(page.locator('text=Welcome, John Doe!')).toBeVisible(); // Adjust as needed
  });

  test('shows error for invalid phone number', async ({ page }) => {
    await page.fill('input[data-testid="phoneInput"]', 'invalidPhone');
    await page.click('button[data-testid="nextButton"]');

    // Verify error message
    await expect(page.locator('text=Please enter a valid phone number')).toBeVisible(); // Adjust as needed
  });
});
