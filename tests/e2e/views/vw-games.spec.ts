// import { deleteAllUsers } from '$lib/db/queries/testing/deleteAllUsers';
import { expect, test } from '@playwright/test';
import { deleteAllGames } from '$lib/db/queries/testing/deleteAllGames';
import { addGames } from '$lib/db/queries/testing/addGames';
import { addGameByName } from '$lib/db/queries/testing/addGameByName';
import getMiddleOfString from '$lib/utils/getMiddleOfString';
import { registerUserAndLogin } from '../shared/registerUserAndLogin.test';

test('vw-games-table_should_behave_properly', async ({ page }) => {
	await registerUserAndLogin(page);

	await deleteAllGames();
	await addGames();

	await page.goto("/games");

	await page.waitForURL(`**/games`);
	expect(page.url()).toContain(`games`);

	const firstPageButton = page.getByTestId('first-page-link-button');
	const prevPageButton = page.getByTestId('prev-page-link-button');
	const nextPageButton = page.getByTestId('next-page-link-button');
	const lastPageButton = page.getByTestId('last-page-link-button');

	await nextPageButton.click();
	await page.waitForEvent('framenavigated');

	expect(page.url()).toContain(`page=2`);

	await lastPageButton.click();
	await page.waitForEvent('framenavigated');

	expect(page.url()).toContain(`page=10`);

	await prevPageButton.click();
	await page.waitForEvent('framenavigated');

	expect(page.url()).toContain(`page=9`);

	await firstPageButton.click();
	await page.waitForEvent('framenavigated');

	expect(page.url()).toContain(`page=1`);
});

test('vw-games-search_filter_by_name', async ({ page }) => {
	await registerUserAndLogin(page);

	const gameName = "Eclipse: Total Eclipse of the Stars";
	
	await deleteAllGames();
	await addGames({ noOfGames: 20 });
	await addGameByName(gameName);

	await page.goto("/games");

	await page.waitForURL(`**/games`);
	expect(page.url()).toContain(`games`);

	const searchField = page.getByTestId("table-search-field");
	
	await searchField.fill(gameName);
	await page.waitForEvent('framenavigated');

	const searchResultTitle = await page.textContent(`text=${gameName}`);
	expect(searchResultTitle).toEqual(gameName);
});

test('vw-games-search_filter_by_partial_name', async ({ page }) => {
	await registerUserAndLogin(page);

	const gameName = "Eclipse: Total Eclipse of the Stars";
	const gameNameSliced = getMiddleOfString(gameName);
	
	await deleteAllGames();
	await addGames({ noOfGames: 20 });
	await addGameByName(gameName);

	await page.goto("/games");

	await page.waitForURL(`**/games`);
	expect(page.url()).toContain(`games`);

	const searchField = page.getByTestId("table-search-field");
	await searchField.fill(gameNameSliced);
	await page.waitForEvent('framenavigated');

	const searchResultSlicedTitle = await page.textContent(`text=${gameName}`);
	expect(searchResultSlicedTitle).toEqual(gameName);
});

test('vw-games-button_states_should_update_properly', async ({ page }) => {
	await registerUserAndLogin(page);

	await deleteAllGames();
	await addGames();

	await page.goto("/games");

	await page.waitForURL(`**/games`);
	expect(page.url()).toContain(`games`);

	const firstPageButton = page.getByTestId('first-page-link-button');
	const prevPageButton = page.getByTestId('prev-page-link-button');
	const nextPageButton = page.getByTestId('next-page-link-button');
	const lastPageButton = page.getByTestId('last-page-link-button');

	expect(firstPageButton).toHaveClass(/btn-disabled/);
	expect(prevPageButton).toHaveClass(/btn-disabled/);
	expect(nextPageButton).not.toHaveClass(/btn-disabled/);
	expect(lastPageButton).not.toHaveClass(/btn-disabled/);

	await nextPageButton.click();
	await page.waitForEvent('framenavigated');

	expect(firstPageButton).not.toHaveClass(/btn-disabled/);
	expect(prevPageButton).not.toHaveClass(/btn-disabled/);
	expect(nextPageButton).not.toHaveClass(/btn-disabled/);
	expect(lastPageButton).not.toHaveClass(/btn-disabled/);

	await lastPageButton.click();
	await page.waitForEvent('framenavigated');

	expect(firstPageButton).not.toHaveClass(/btn-disabled/);
	expect(prevPageButton).not.toHaveClass(/btn-disabled/);
	expect(nextPageButton).toHaveClass(/btn-disabled/);
	expect(lastPageButton).toHaveClass(/btn-disabled/);

	await prevPageButton.click();
	await page.waitForEvent('framenavigated');

	expect(firstPageButton).not.toHaveClass(/btn-disabled/);
	expect(prevPageButton).not.toHaveClass(/btn-disabled/);
	expect(nextPageButton).not.toHaveClass(/btn-disabled/);
	expect(lastPageButton).not.toHaveClass(/btn-disabled/);

	// this last part is necessary so browser doesn't close when running the tests
	await firstPageButton.click();
	await page.waitForEvent('framenavigated'); 
});

test('vw-games-button_states_should_update_properly', async ({ page }) => {
	await registerUserAndLogin(page);

	await deleteAllGames();
	await addGames();

	await page.goto("/games");

	await page.waitForURL(`**/games`);
	expect(page.url()).toContain(`games`);

	const firstPageButton = page.getByTestId('first-page-link-button');
	const prevPageButton = page.getByTestId('prev-page-link-button');
	const nextPageButton = page.getByTestId('next-page-link-button');
	const lastPageButton = page.getByTestId('last-page-link-button');

	expect(firstPageButton).toHaveClass(/btn-disabled/);
	expect(prevPageButton).toHaveClass(/btn-disabled/);
	expect(nextPageButton).not.toHaveClass(/btn-disabled/);
	expect(lastPageButton).not.toHaveClass(/btn-disabled/);

	await nextPageButton.click();
	await page.waitForEvent('framenavigated');

	expect(firstPageButton).not.toHaveClass(/btn-disabled/);
	expect(prevPageButton).not.toHaveClass(/btn-disabled/);
	expect(nextPageButton).not.toHaveClass(/btn-disabled/);
	expect(lastPageButton).not.toHaveClass(/btn-disabled/);

	await lastPageButton.click();
	await page.waitForEvent('framenavigated');

	expect(firstPageButton).not.toHaveClass(/btn-disabled/);
	expect(prevPageButton).not.toHaveClass(/btn-disabled/);
	expect(nextPageButton).toHaveClass(/btn-disabled/);
	expect(lastPageButton).toHaveClass(/btn-disabled/);

	await prevPageButton.click();
	await page.waitForEvent('framenavigated');

	expect(firstPageButton).not.toHaveClass(/btn-disabled/);
	expect(prevPageButton).not.toHaveClass(/btn-disabled/);
	expect(nextPageButton).not.toHaveClass(/btn-disabled/);
	expect(lastPageButton).not.toHaveClass(/btn-disabled/);

	// this last part is necessary so browser doesn't close when running the tests
	await firstPageButton.click();
	await page.waitForEvent('framenavigated'); 
});