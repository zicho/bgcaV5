// import { deleteAllUsers } from '$lib/db/queries/testing/deleteAllUsers';
import { expect, test } from '@playwright/test';
import generateTestUsername from '../../test_utils/generateTestUsername';
import registerUserAndReturnSession from '$lib/db/queries/authentication/registerUserAndReturnSession';
import { registerUserAndLogin } from '../shared/registerUserAndLogin';

test('vw-profile-signed_in_user_should_be_able_to_add_profile_data', async ({ page }) => {
	const username = await registerUserAndLogin(page);

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
	const username = await registerUserAndLogin(page);
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
	const username = await registerUserAndLogin(page);

	const profileLink = page.getByTestId('navbar-link-profile');
	await profileLink.click();

	const header = page.getByRole('heading', { level: 1 });

	await expect(header).toBeVisible();
	await expect(header).toHaveText("Your profile");
	await expect(page.getByTestId("link-edit-your-profile")).toBeVisible();
	await expect(page.getByTestId("profile-edit-profile-btn")).toBeVisible();
	await expect(page.getByTestId("profile-send-message-btn")).not.toBeVisible();
});
