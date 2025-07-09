import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod/v4"
import { schema } from "../../db/schemas/index.ts"
import { db } from "../../db/connections.ts"

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
    app.post(
        '/room/:id/questions',
        {
            schema:{
                params: z.object({
                    id: z.string()
                }),
                body: z.object({
                    question: z.string().min(1),
                })
            }
        },
        async (request, reply) => {
            const { id } = request.params
            const { question } = request.body

            const result = await db.insert(schema.questions).values({
                questions: question,
                roomID: id
            }).returning()

            const insertedQuestion = result[0]

            if (!result) {
                throw new Error('Failed to create')
            }

            return reply.status(201).send({ questionsId: insertedQuestion.id})
        }
    )
}