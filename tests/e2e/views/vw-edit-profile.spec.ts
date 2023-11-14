// import { deleteAllUsers } from '$lib/db/queries/testing/deleteAllUsers';
import { expect, test } from '@playwright/test';
import generateTestUsername from '../../test_utils/generateTestUsername';
import registerUserAndReturnSession from '$lib/db/queries/authentication/registerUserAndReturnSession';

test('vw-profile-signed_in_user_should_be_able_to_add_profile_data', async ({ page }) => {
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

	const editProfileLink = page.getByTestId("link-edit-your-profile");
	await editProfileLink.click();
	
	await page.waitForURL(`**/profile/${username}/edit`);
	const editProfileTextArea = page.getByTestId("edit-profile-description");

	await expect(editProfileTextArea).toBeEmpty();

	const newProfileInfo = "I am the new profile info!";

	await editProfileTextArea.fill(newProfileInfo);

	const editProfileSubmitButton = page.getByTestId("edit-profile-btn-submit");
	await editProfileSubmitButton.click();
	
	await page.waitForURL(`**/profile/${username}`);
	await expect(page.getByText(newProfileInfo)).toBeVisible();
});

test('vw-profile-signed_in_user_should_be_able_to_update_profile_data', async ({ page }) => {
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

	const editProfileButton = page.getByTestId("profile-edit-profile-btn");
	await editProfileButton.click();
	
	await page.waitForURL(`**/profile/${username}/edit`);
	const editProfileTextArea = page.getByTestId("edit-profile-description");

	await expect(editProfileTextArea).toBeEmpty();

	const newProfileInfo = "I am the new profile info!";

	await editProfileTextArea.fill(newProfileInfo);

	const editProfileSubmitButton = page.getByTestId("edit-profile-btn-submit");
	await editProfileSubmitButton.click();
	
	await page.waitForURL(`**/profile/${username}`);
	await expect(page.getByText(newProfileInfo)).toBeVisible();

	await editProfileButton.click();
	await page.waitForURL(`**/profile/${username}/edit`);
	await expect(editProfileTextArea).not.toBeEmpty();

	const updatedProfileInfo = "I am the updated profile info!";
	await editProfileTextArea.clear();
	await editProfileTextArea.fill(updatedProfileInfo);
	await editProfileSubmitButton.click();
	
	await page.waitForURL(`**/profile/${username}`);
	await expect(page.getByText(newProfileInfo)).not.toBeVisible();
	await expect(page.getByText(updatedProfileInfo)).toBeVisible();
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
	await expect(page.getByTestId("link-edit-your-profile")).toBeVisible();
	await expect(page.getByTestId("profile-edit-profile-btn")).toBeVisible();
	await expect(page.getByTestId("profile-send-message-btn")).not.toBeVisible();
});
