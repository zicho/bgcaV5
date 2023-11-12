// import { deleteAllUsers } from '$lib/db/queries/testing/deleteAllUsers';
import { expect, test } from '@playwright/test';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import generateTestUsername from 'tests/test_utils/generateTestUsername';

const findProjectRoot = (currentPath: string): string => {
	if (fs.existsSync(path.join(currentPath, 'package.json'))) {
		return currentPath;
	} else {
		const nextPath = path.resolve(currentPath, '..');

		if (nextPath === currentPath) {
			throw new Error('Project root not found');
		}

		return findProjectRoot(nextPath);
	}
};

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const projectRoot: string = findProjectRoot(__dirname);

const protectedFolderPath: string = path.join(projectRoot, 'src', 'routes', '(protected)');
const notAuthedFolderPath: string = path.join(projectRoot, 'src', 'routes', '(non_authed)');

function getAllFolderNamesForPath(folderPath: string): string[] {

	let directories: string[] = []

	fs.readdir(folderPath, (err, files) => {
		if (err) {
		  console.error('Error reading the directory:', err);
		  return;
		}
	  
		directories = files.filter((file) =>
		  fs.statSync(path.join(folderPath, file)).isDirectory()
		);
	  
		
	  });

	return directories;
}

test('core-all_protected_routes_should_redirect_to_login', async ({ page }) => {
	var protectedRouteFolders = getAllFolderNamesForPath(protectedFolderPath);

	for(const route of protectedRouteFolders) {
		await page.goto(route);
		expect(page.url()).toContain("login");
	}
});

test('core-all_auth_routes_should_redirect_to_home', async ({ page }) => {

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

	var nonAuthedRouteFolders = getAllFolderNamesForPath(notAuthedFolderPath);

	for(const route of nonAuthedRouteFolders) {
		await page.goto(route);
		expect(page.url()).toContain("home");
	}
});

