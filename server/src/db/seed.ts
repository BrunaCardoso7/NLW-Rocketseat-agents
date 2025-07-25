import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connections.ts";
import { schema } from "./schemas/index.ts";
import { rooms } from "./schemas/rooms.ts";

await reset(db, schema)
await seed(db, schema).refine(f => {
    return {
        rooms: {
            count: 20,
            columns: {
                name: f.companyName(),
                description: f.loremIpsum()
            }
        },
        with: {
            questions: {
            count: 5,
        }}
    }
})
await sql.end()

console.log("database seeded")
