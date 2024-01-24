import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games as g } from "$lib/db/schema/games";
import { ilike } from "drizzle-orm";

type Game = Omit<typeof g.$inferSelect, 'minPlayers' | 'maxPlayers' | 'image' | 'playingTime' | 'isExpansion'>;

export async function getGamesPaginated({ pageNo, limit, searchParam }: { pageNo?: number, limit?: number, searchParam?: string } = {}): Promise<ApiResponse<Game[]>> {
    try {
        if (!limit) { limit = 10; }
        if (!pageNo) { pageNo = 1; }
        if (!searchParam) { searchParam = ''; }

        const pageResult = await db
            .select({
                gameId: g.gameId,
                name: g.name,
                description: g.description,
                slug: g.slug,
                averageRating: g.averageRating,
                thumbnail: g.thumbnail,
                yearPublished: g.yearPublished
            })
            .from(g)
            .orderBy(g.name)
            .where(ilike(g.name, `%${searchParam}%`))
            .limit(limit)
            .offset((pageNo - 1) * limit);

        return successfulResponse(pageResult);
    } catch {
        return failedResponse(DataRetrievalFail);
    }
}