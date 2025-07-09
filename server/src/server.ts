import fastify from "fastify"
import { sql } from "./db/connections.ts"
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod'

import {fastifyCors} from '@fastify/cors'
import { env } from "./env.ts"
import { getRoomsRoute } from "./http/routes/get-rooms.ts"
import { createRoomsRoute } from "./http/routes/create-rooms.ts"
import { getRoomsQuestionRoute } from "./http/routes/get-room-question.ts"
import { createQuestionRoute } from "./http/routes/create-question.ts"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(
    fastifyCors,{
        origin: '*'
    }
)
app.register(getRoomsRoute)
app.register(createRoomsRoute)
app.register(createQuestionRoute)
app.register(getRoomsQuestionRoute)
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.listen({ port: env.PORT}).then(()=>{
    console.log("AEEEEEEEEEEEEE SERVIDOR NO ARRR!")
})