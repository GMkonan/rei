import { drizzle } from "drizzle-orm/node-postgres";

// pass the docker local url one
// const dbUrl = process.env.RAILWAY_DB_URL as string;
const dbUrl = process.env.DB_URL as string;
const db = drizzle(dbUrl);

export default db;
