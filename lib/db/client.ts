import { drizzle } from "drizzle-orm/netlify-db"

// export const db = drizzle(process.env.NETLIFY_DB_URL!)
export const db = drizzle()

// Netlify Database is now the required runtime database.
// Kept as a compatibility flag for the existing admin UI.
export const databaseConfigured = true

