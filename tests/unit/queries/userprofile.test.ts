import { db } from '$lib/db/client';
import registerUserAndReturnSession from '$lib/db/queries/authentication/registerUserAndReturnSession';
import type { UpdateProfileModel } from '$lib/db/queries/profile/getUserProfileWithIds';
import { upsertUserProfile } from '$lib/db/queries/profile/upsertUserProfile';
import { userProfiles, users } from '$lib/db/schema/users';
import { eq } from 'drizzle-orm';
import generateTestUsername from 'tests/test_utils/generateTestUsername';
import { describe, it, expect } from 'vitest';

describe('sum test', () => {
	it('update user profile', async () => {

		const username = generateTestUsername();
		const user = await registerUserAndReturnSession({ username, password: "password" });
		
		const model: UpdateProfileModel = {
			userId: user.result?.user.userId as string,
			description: "desc"
		}

		async function getProfiles(userId: string) {
			const profiles = (await db
				.select()
				.from(userProfiles)
				.where(eq(userProfiles.userId, userId)));

			return profiles;
		}

		const userId = user.result?.user.userId as string;

		const shouldBeZero = await getProfiles(userId) ;
		expect(shouldBeZero.length).toBe(0);

		const profile = await upsertUserProfile(model);

		expect((profile).result?.userId).toBe(model.userId);
		expect((profile).result?.description).toBe(model.description);
		
		const newModel: UpdateProfileModel = {
			userId: user.result?.user.userId as string,
			description: "descUpdate"
		} 

		const updatedProfile = await upsertUserProfile(newModel);

		expect((updatedProfile).result?.userId).toBe(profile.result?.userId);
		expect((updatedProfile).result?.description).toBe(newModel.description);

		const shouldBeOne = await getProfiles(userId);
		expect(shouldBeOne.length).toBe(1);
	});
});
