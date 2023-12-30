import registerUserAndReturnSession from "$lib/db/queries/authentication/registerUserAndReturnSession";
import { expect, type Page } from "@playwright/test";
import generateTestUsername from "tests/test_utils/generateTestUsername";

export async function registerUserAndLogin(page: Page) {
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
	return username;
}