import { db } from '../../client'
import { sql } from 'drizzle-orm'

export async function deleteAllGames() {
    await db.execute(sql`select delete_games();`)
}