import { db } from "$lib/db/client";
import { games, usersToGameCollections } from "$lib/db/schema/games";
import { and, eq, ilike, sql } from "drizzle-orm";

export async function getTotalGameCount({ userId = "", searchParam = "" } : { userId: string, searchParam: string }): Promise<number> {
    // todo: conditional query instead of two separate, somehow?
    if (userId) {
        const totalHits = (
            await db
                .select({ count: sql<number>`count(*)` })
                .from(usersToGameCollections)
                .where(and(eq(usersToGameCollections.userId, userId), ilike(games.name, `%${searchParam}%`)))
                .leftJoin(games, eq(usersToGameCollections.gameId, games.id))
        )[0].count;

        return totalHits;
    }

    const totalHits = (
        await db
            .select({ count: sql<number>`count(*)` })
            .from(games)
            .where(and(ilike(games.name, `%${searchParam}%`)))
    )[0].count;

    return totalHits;
}