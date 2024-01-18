import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games, usersToGameCollections } from "$lib/db/schema/games";
import { ilike, and, eq } from "drizzle-orm";

type Game = Omit<typeof games.$inferSelect, 'minNumberOfPlayers' | 'maxNumberOfPlayers' | 'imageUrl'>;

export async function getGameCollection({ userId, pageNo, limit, searchParam }: { userId: string, pageNo?: number, limit?: number, searchParam?: string }): Promise<ApiResponse<Game[]>> {
    try {
        if (!limit) { limit = 10; }
        if (!pageNo) { pageNo = 1; }
        if (!searchParam) { searchParam = ''; }

        const pageResult = await db
            .select({
                id: games.id,
                bggId: games.bggId,
                name: games.name,
                desc: games.desc,
                slug: games.slug,
                averageRating: games.averageRating,
                thumbnailUrl: games.thumbnailUrl,
                yearPublished: games.yearPublished
            })
            .from(usersToGameCollections)
            .orderBy(games.name)
            .where(and(eq(usersToGameCollections.userId, userId), ilike(games.name, `%${searchParam}%`)))
            .leftJoin(games, eq(usersToGameCollections.gameId, games.id))
            .limit(limit)
            .offset((pageNo - 1) * limit);

        return successfulResponse(pageResult as Game[]);
    } catch(e) {
        console.dir(e);
        return failedResponse(DataRetrievalFail);
    }
}