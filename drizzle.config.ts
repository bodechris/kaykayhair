import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./netlify/database/migrations",


  dbCredentials: process.env.NETLIFY_DB_URL
    ? {
        url: process.env.NETLIFY_DB_URL,
      }
    : undefined,
})