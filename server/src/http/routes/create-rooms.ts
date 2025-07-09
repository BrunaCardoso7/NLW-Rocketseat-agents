import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod/v4"
import { schema } from "../../db/schemas/index.ts"
import { db } from "../../db/connections.ts"

export const createRoomsRoute: FastifyPluginCallbackZod = (app) => {
    app.post(
        '/rooms',
        {
            schema:{
                body: z.object({
                    name: z.string().min(1),
                    description: z.string().optional(),
                })
            }
        },
        async (request, reply) => {
            const { name, description } = request.body

            const result = await db.insert(schema.rooms).values(
               { name,
                description,}
            ).returning()

            const insertedRoom = result[0]

            if (!result) {
                throw new Error('Failed to create')
            }

            return reply.status(201).send({ roomId: insertedRoom.id})
        }
    )
}