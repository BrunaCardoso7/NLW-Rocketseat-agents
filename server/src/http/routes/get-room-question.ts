import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { db } from "../../db/connections.ts"
import { schema } from "../../db/schemas/index.ts"
import { z } from "zod/v4"
import { desc, eq } from "drizzle-orm"
import { questions } from "../../db/schemas/questions.ts"

export const getRoomsQuestionRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/rooms/:id/question',  {
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        schema: {
            params: z.object({
                id: z.string(),
            })
        }},
        async (request) => {
            const { id } = request.params

            const result = await db.select(
               {
                    id: schema.questions.id,
                    questions: schema.questions.questions,
                    answer: schema.questions.answer,
                    createdAt: schema.questions.createdAt,
               }
            ).from(schema.questions).where(
                eq(schema.questions.roomID, id)
            ).orderBy(desc(questions.createdAt))

            return result
        }
    )
}