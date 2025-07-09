import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { db } from "../../db/connections.ts"
import { schema } from "../../db/schemas/index.ts"

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/rooms', async () => {
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        const results = await db.select(
            {
                id: schema.rooms.id,
                name: schema.rooms.name
            }
        ).from(schema.rooms).orderBy(schema.rooms.createdAt)
        return results 
    })
}