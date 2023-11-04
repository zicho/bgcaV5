// import { deleteAllUsers } from '$lib/db/queries/testing/deleteAllUsers';
import { expect, test } from '@playwright/test';
import generateTestUsername from './test_utils/generateTestUsername';

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

test('vw-register-invalid_username', async ({ page }) => {
	await page.goto('/register');

	// all fields need to be filled to pass browser form validation
	const usernameInput = page.getByTestId("username");
	await usernameInput.fill("us");
	const passwordInput = page.getByTestId("password");
	await passwordInput.fill("us");
	const confimPasswordInput = page.getByTestId("confirm_password");
	await confimPasswordInput.fill("us");

	const registerButton = page.getByTestId('register');
	await registerButton.click();

	const usernameError = page.getByTestId("username-error-message");
	await (expect(usernameError).toBeVisible());
});

test('vw-register-invalid_password', async ({ page }) => {
	await page.goto('/register');

	// all fields need to be filled to pass browser form validation
	const usernameInput = page.getByTestId("username");
	await usernameInput.fill("us");
	const passwordInput = page.getByTestId("password");
	await passwordInput.fill("us");
	const confimPasswordInput = page.getByTestId("confirm_password");
	await confimPasswordInput.fill("us");

	const registerButton = page.getByTestId('register');
	await registerButton.click();

	const passwordError = page.getByTestId("password-error-message");
	await (expect(passwordError).toBeVisible());
});

test('vw-register-password_diff', async ({ page }) => {
	await page.goto('/register');

	// all fields need to be filled to pass browser form validation
	const usernameInput = page.getByTestId("username");
	await usernameInput.fill("username");
	const passwordInput = page.getByTestId("password");
	await passwordInput.fill("password");
	const confimPasswordInput = page.getByTestId("confirm_password");
	await confimPasswordInput.fill("other_password");

	const registerButton = page.getByTestId('register');
	await registerButton.click();

	const usernameError = page.getByTestId("username-error-message");
	await (expect(usernameError).toBeHidden());
	const passwordError = page.getByTestId("password-error-message");
	await (expect(passwordError).toBeVisible());
	const confirmPasswordError = page.getByTestId("confirm_password-error-message");
	await (expect(confirmPasswordError).toBeVisible());
});

test('vw-register-form_should_not_reset_username', async ({ page }) => {
	await page.goto('/register');

	const username = generateTestUsername();

	// all fields need to be filled to pass browser form validation
	const usernameInput = page.getByTestId("username");
	await usernameInput.fill(username);
	const passwordInput = page.getByTestId("password");
	await passwordInput.fill("password");
	const confimPasswordInput = page.getByTestId("confirm_password");
	await confimPasswordInput.fill("other_password");

	const registerButton = page.getByTestId('register');
	await registerButton.click();

	const usernameError = page.getByTestId("username-error-message");
	
	await (expect(usernameError).toBeHidden());
	expect(usernameInput).toHaveValue(username);

	const passwordError = page.getByTestId("password-error-message");
	await (expect(passwordError).toBeVisible());
	const confirmPasswordError = page.getByTestId("confirm_password-error-message");
	await (expect(confirmPasswordError).toBeVisible());
});

test('vw-register-redirect_on_success', async ({ page }) => {
	// await deleteAllUsers();
	await page.goto('/register');

	const username = generateTestUsername();

	// all fields need to be filled to pass browser form validation
	const usernameInput = page.getByTestId("username");
	await usernameInput.fill(username);
	const passwordInput = page.getByTestId("password");
	await passwordInput.fill("password");
	const confimPasswordInput = page.getByTestId("confirm_password");
	await confimPasswordInput.fill("password");

	const registerButton = page.getByTestId('register');
	await registerButton.click();
	await (expect(page.getByTestId("frontpage-header")).toBeVisible());
});