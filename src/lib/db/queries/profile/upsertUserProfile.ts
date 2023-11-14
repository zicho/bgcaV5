import { DataUpdateFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { userProfiles } from "$lib/db/schema/users";
import type { UpdateProfileModel } from "./getUserProfileWithIds";

export async function upsertUserProfile(model: UpdateProfileModel): Promise<ApiResponse<void>> {
    try {
		await db
			.insert(userProfiles)
			.values(model)
			.onConflictDoUpdate({
				target: userProfiles.id,
				set: model
			});

        return successfulResponse();;
    } catch(err) {
        return failedResponse(DataUpdateFail);
    }
}