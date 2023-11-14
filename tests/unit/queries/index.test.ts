import registerUserAndReturnSession from '$lib/db/queries/authentication/registerUserAndReturnSession';
import type { UpdateProfileModel } from '$lib/db/queries/profile/getUserProfileWithIds';
import { upsertUserProfile } from '$lib/db/queries/profile/upsertUserProfile';
import generateTestUsername from 'tests/test_utils/generateTestUsername';
import { describe, it, expect } from 'vitest';

describe('sum test', () => {
	it('update user profile', async () => {

		const username = generateTestUsername();
		const user = await registerUserAndReturnSession({ username, password: "password" });
		
		const model: UpdateProfileModel = {
			userId: user.result?.user.userId,
			description: "desc"
		} 

		const profile = await upsertUserProfile(model);
		expect((profile).result?.description).toBe("desc");
		
		const newModel: UpdateProfileModel = {
			userId: user.result?.user.userId,
			description: "descUpdate"
		} 

		const updatedProfile = await upsertUserProfile(newModel);
		expect((updatedProfile).result?.description).toBe("descUpdate");
	});
});
