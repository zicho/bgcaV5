import { expect, test } from '@playwright/test';

test('vw-login-form_visibility', async ({ page }) => {
	await page.goto('/login');
	await expect(page.getByRole('heading')).toBeVisible();
	await expect(page.getByTestId('username')).toBeVisible();
	await expect(page.getByTestId('password')).toBeVisible();
	await expect(page.getByTestId('login')).toBeVisible();
});

test('vw-login-initial_load_no_error', async ({ page }) => {
	await page.goto('/login');
	await expect(page.getByTestId('error-message-box')).toBeHidden();
});

test('vw-login-register_button', async ({ page }) => {
	await page.goto('/login');

	const registerLinkButton = page.getByTestId('register-link-button');

	await expect(registerLinkButton).toBeVisible();
	await registerLinkButton.click();
	await page.waitForURL('**/register');
	
	expect(page.url()).toContain("register");
});

test('vw-login-register_link', async ({ page }) => {
	await page.goto('/login');

	const registerLink = page.getByTestId("layout-register-link");

	await expect(registerLink).toBeVisible();
	await registerLink.click();
	await page.waitForURL('**/register');

	expect(page.url()).toContain("register");
});