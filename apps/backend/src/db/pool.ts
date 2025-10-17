import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

async function initDB(): Promise<void> {
  const createTableQuery = `
    CREATE DATABASE IF NOT EXISTS pixelchain
  `;
  await pool.query(createTableQuery);
}

initDB().catch(console.error);

export const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
  port: Number(process.env.PG_PORT),
});
