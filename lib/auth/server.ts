import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2"

import { db } from "@/lib/db/client"
import * as schema from "@/lib/db/schema"

export const auth = betterAuth({
  
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.URL ||
    "http://localhost:3000",

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