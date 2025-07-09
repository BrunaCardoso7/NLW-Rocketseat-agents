import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { db } from "../../db/connections.ts"
import { schema } from "../../db/schemas/index.ts"
import { count, eq } from "drizzle-orm"

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/rooms', async () => {
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        const results = await db.select(
            {
                id: schema.rooms.id,
                name: schema.rooms.name,
                createAt: schema.rooms.createdAt,
                questionsCount: count(schema.questions.id),
            }
        ).from(schema.rooms).leftJoin(schema.questions, eq(schema.questions.roomID, schema.rooms.id)).groupBy(schema.rooms.id).orderBy(schema.rooms.createdAt)
       
        return results 
    })
}