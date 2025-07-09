import postgres from 'postgres'
import { env } from '../env.ts'
import { drizzle } from 'drizzle-orm/postgres-js'
import { schema } from './schemas/index.ts'
 
export const sql = postgres(env.DATABASE_URL)
export const db = drizzle(sql, {
    schema,
    casing: "snake_case"
})


const result = await sql`SELECT 'hello' as message`

console.log(result)