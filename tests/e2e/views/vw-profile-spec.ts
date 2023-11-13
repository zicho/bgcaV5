// import { deleteAllUsers } from '$lib/db/queries/testing/deleteAllUsers';
import { expect, test } from '@playwright/test';
import generateTestUsername from '../../test_utils/generateTestUsername';
import registerUserAndReturnSession from '$lib/db/queries/authentication/registerUserAndReturnSession';

test('vw-profile-navbar_should_link_to_user_profile', async ({ page }) => {
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

	const profileLink = page.getByTestId('navbar-link-profile');
	await profileLink.click();

	await page.waitForURL(`**/profile/${username}`);

	expect(page.url()).toContain(username);
});

test('vw-profile-incomplete_url_should_redirect_to_user_profile', async ({ page }) => {
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
	await page.goto("/profile");

	await page.waitForURL(`**/profile/${username}`);
	expect(page.url()).toContain(`profile/${username}`);
});

test('vw-profile-user_owned_profile_layout', async ({ page }) => {
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

	const profileLink = page.getByTestId('navbar-link-profile');
	await profileLink.click();

	const header = page.getByRole('heading', { level: 1 });

	await expect(header).toBeVisible();
	await expect(header).toHaveText("Your profile");
	await expect(page.getByTestId("profile-edit-profile-btn")).toBeVisible();
	await expect(page.getByTestId("profile-send-message-btn")).not.toBeVisible();
});

test('vw-profile-other_user_profile_layout', async ({ page }) => {
	const username = generateTestUsername();
	const secondUsername = generateTestUsername();

	await registerUserAndReturnSession({ username, password: "password" });
	await registerUserAndReturnSession({ username: secondUsername, password: "password" });

	await page.goto('/login');

	// all fields need to be filled to pass browser form validation
	const usernameInput = page.getByTestId("username");
	await usernameInput.clear();
	await usernameInput.fill(username);
	const passwordInput = page.getByTestId("password");
	await passwordInput.fill("password");

	const loginButton = page.getByTestId('login');
	await loginButton.click();
	await (expect(page.getByTestId("frontpage-header")).toBeVisible());

	await page.goto(`/profile/${secondUsername}`)

	
	const header = page.getByRole('heading', { level: 1 });
	await expect(header).toBeVisible();
	await expect(header).toContainText(secondUsername);
	
	await expect(page.getByTestId("profile-edit-profile-btn")).not.toBeVisible();
	await expect(page.getByTestId("profile-send-message-btn")).toBeVisible();

	expect(page.url()).toContain(`profile/${secondUsername}`);
});