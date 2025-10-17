// models/User.ts
import { Pool } from "pg";

const pool: Pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pixelchain",
  password: "SPGShan58743",
  port: 5432,
});

interface UserRow {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

class User {
  id: string;
  name: string;
  email: string;
  createdAt: Date | null;

  constructor(row: UserRow) {
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.createdAt = row.created_at;
  }

  static async findById(id: string): Promise<User | null> {
    const query = "SELECT id, name, email, created_at FROM users WHERE id = $1";
    const result = await pool.query<UserRow>(query, [id]);
    const rows = result.rows;
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0] as UserRow;
    return new User(row);
  }

  static async create(id: string, name: string, email: string): Promise<User> {
  const query =
    "INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *";
  const { rows } = await pool.query<UserRow>(query, [id, name, email]);

  if (rows.length === 0) {
    throw new Error("Insert failed: no row returned");
  }
  const row = rows[0] as UserRow;
  return new User(row);
}

  static async findAll(): Promise<User[]> {
    const query = "SELECT id, name, email, created_at FROM users";
    const { rows } = await pool.query<UserRow>(query);
    return rows.map((row) => new User(row));
  }
}

async function initDB(): Promise<void> {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(createTableQuery);
}

initDB().catch(console.error);

export default User;
