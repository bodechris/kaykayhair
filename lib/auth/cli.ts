import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import * as schema from "@/lib/db/schema"

const pool = new Pool({
  connectionString: process.env.NETLIFY_DB_URL!,
})

const db = drizzle({
  client: pool,
})

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:8888",

  secret: process.env.BETTER_AUTH_SECRET!,

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
  },

  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
  ],
})