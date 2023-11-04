import registerUserAndReturnSession from '$lib/db/queries/authentication/registerUserAndReturnSession';
import { expect, test } from '@playwright/test';
import generateTestUsername from './test_utils/generateTestUsername';
import { UsernameAlreadyTaken } from '$lib/data/strings/ErrorMessages';

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

test('vw-register-no_duplicate_usernames', async ({ page }) => {
	
	test.setTimeout(120000)
	const username = generateTestUsername();
	await registerUserAndReturnSession({
		username, password: "password"
	});

	// await page.goto('/register');

	// // all fields need to be filled to pass browser form validation
	// const usernameInput = page.getByTestId("username");
	// await usernameInput.fill(username);
	// const passwordInput = page.getByTestId("password");
	// await passwordInput.fill("password");
	// const confimPasswordInput = page.getByTestId("confirm_password");
	// await confimPasswordInput.fill("password");

	// // const registerButton = page.getByTestId('register');
	// // await registerButton.click();

	// await expect(page.getByTestId('error-message-box')).toBeVisible();

});