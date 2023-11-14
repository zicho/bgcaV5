// import { deleteAllUsers } from '$lib/db/queries/testing/deleteAllUsers';
import { expect, test } from '@playwright/test';
import generateTestUsername from '../../test_utils/generateTestUsername';
import loginUserAndReturnSession from '$lib/db/queries/authentication/loginUserAndReturnSession';
import { IncorrectUsernameOrPassword, UsernameAlreadyTaken } from '$lib/data/strings/ErrorMessages';
import registerUserAndReturnSession from '$lib/db/queries/authentication/registerUserAndReturnSession';

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

	const registerLink = page.getByTestId("navbar-link-register");

	await expect(registerLink).toBeVisible();
	await registerLink.click();
	await page.waitForURL('**/register');

	expect(page.url()).toContain("register");
});

test('vw-login-invalid_username', async ({ page }) => {
	await page.goto('/login');

	// all fields need to be filled to pass browser form validation
	const usernameInput = page.getByTestId("username");
	await usernameInput.fill("us");
	const passwordInput = page.getByTestId("password");
	await passwordInput.fill("us");

	const loginButton = page.getByTestId('login');
	await loginButton.click();

	const errorMessageBox = page.getByTestId("error-message-box");

	await expect(errorMessageBox).toBeVisible();
	await (expect(errorMessageBox).toHaveText(IncorrectUsernameOrPassword));
});

test('vw-login-invalid_password', async ({ page }) => {
	await page.goto('/login');

	// all fields need to be filled to pass browser form validation
	const usernameInput = page.getByTestId("username");
	await usernameInput.fill("us");
	const passwordInput = page.getByTestId("password");
	await passwordInput.fill("us");

	const loginButton = page.getByTestId('login');
	await loginButton.click();

	const errorMessageBox = page.getByTestId("error-message-box");

	await expect(errorMessageBox).toBeVisible();
	await (expect(errorMessageBox).toHaveText(IncorrectUsernameOrPassword));
});

test('vw-login-ui_should_update_after_login', async ({ page }) => {
	const username = generateTestUsername();
	await registerUserAndReturnSession({ username, password: "password" });

	await page.goto('/login');

	// all fields need to be filled to pass browser form validation
	const usernameInput = page.getByTestId("username");
	await usernameInput.fill(username);
	const passwordInput = page.getByTestId("password");
	await passwordInput.fill("password");

	const loginButton = page.getByTestId('login');
	await loginButton.click();

	await (expect(page.getByTestId("frontpage-header")).toBeVisible());

	const loginNavbarLink = page.getByTestId("navbar-link-login");
	const registerNavbarLink = page.getByTestId("navbar-link-register");
	const signoutNavbarLink = page.getByTestId("navbar-link-signout");
	const profileNavbarLink = page.getByTestId("navbar-link-profile");

	// should not be visible when authed
	await expect(loginNavbarLink).not.toBeVisible();
	await expect(registerNavbarLink).not.toBeVisible();

	// should be visible when authed
	await expect(signoutNavbarLink).toBeVisible();
	await expect(profileNavbarLink).toBeVisible();
	await expect(profileNavbarLink).toHaveText(username);
});

// test('vw-login-form_should_not_reset_username', async ({ page }) => {
// 	await page.goto('/login');

// 	const username = generateTestUsername();
// 	await registerUserAndReturnSession({ username, password: "password" });

// 	// all fields need to be filled to pass browser form validation
// 	const usernameInput = page.getByTestId("username");
// 	await usernameInput.fill(username);
// 	const passwordInput = page.getByTestId("password");
// 	await passwordInput.fill("wrong_password");

// 	const loginButton = page.getByTestId('login');
// 	await loginButton.click();

// 	expect(usernameInput).toHaveValue(username);

// 	const passwordError = page.getByTestId("password-error-message");
// 	await (expect(passwordError).toBeVisible());
// 	const confirmPasswordError = page.getByTestId("confirm_password-error-message");
// 	await (expect(confirmPasswordError).toBeVisible());
// });

test('vw-login-redirect_on_success', async ({ page }) => {
	const username = generateTestUsername();
	await registerUserAndReturnSession({ username, password: "password" });

	await page.goto('/login');

	// all fields need to be filled to pass browser form validation
	const usernameInput = page.getByTestId("username");
	await usernameInput.fill(username);
	const passwordInput = page.getByTestId("password");
	await passwordInput.fill("password");

	const loginButton = page.getByTestId('login');
	await loginButton.click();

	await (expect(page.getByTestId("frontpage-header")).toBeVisible());
});
