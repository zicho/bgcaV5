import { expect, test } from '@playwright/test';

test('vw-register-form_visibility', async ({ page }) => {
	await page.goto('/register');
	await expect(page.getByRole('heading')).toBeVisible();
	await expect(page.getByTestId('username')).toBeVisible();
	await expect(page.getByTestId('password')).toBeVisible();
	await expect(page.getByTestId('confirm_password')).toBeVisible();
	await expect(page.getByTestId('register')).toBeVisible();
});

test('vw-register-initial_load_no_error', async ({ page }) => {
	await page.goto('/register');
	await expect(page.getByTestId('error-message-box')).toBeHidden();
});

test('vw-register-login_button', async ({ page }) => {
	await page.goto('/register');

	const loginLinkButton = page.getByTestId('login-link-button');

	await expect(loginLinkButton).toBeVisible();
	await loginLinkButton.click();
	await page.waitForURL('**/login');
	
	expect(page.url()).toContain("login");
});

test('vw-register-login_link', async ({ page }) => {
	await page.goto('/register');

	const loginLink = page.getByTestId("layout-login-link");

	await expect(loginLink).toBeVisible();
	await loginLink.click();
	await page.waitForURL('**/login');

	expect(page.url()).toContain("login");
});