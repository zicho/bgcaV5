import { db } from '../../client'
import { sql } from 'drizzle-orm'

export async function deleteAllUsers() {
    await db.execute(sql`select delete_users();`)
}