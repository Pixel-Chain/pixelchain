// models/User.ts
import { Pool } from "pg";

const pool: Pool = new Pool({
  user: "postgres",      // Replace with your PG user
  host: "localhost",
  database: "pixelchain",     // Your DB name
  password: "SPGShan58743",  // Replace with your PG password
  port: 5432,
});

interface UserRow {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

class User {
  id: number;
  name: string;
  email: string;
  createdAt: Date | null;

  constructor(row: UserRow) {
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.createdAt = row.created_at;
  }


  static async findById(id: number): Promise<User | null> {
    const query = "SELECT id, name, email, password created_at FROM users WHERE id = $1";  // Exclude password
    const { rows } = await pool.query<UserRow>(query, [id]);
    return rows[0] ? new User({ ...rows[0], password: "" }) : null;  // Dummy password to avoid type error
  }

  static async create(name: string, email: string): Promise<User> {
    const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await pool.query<UserRow>(query, [name, email]);
    return new User(rows[0]);
  }

  static async findAll(): Promise<User[]> {
    const query = "SELECT id, name, email, password created_at FROM users";  // Exclude password
    const { rows } = await pool.query<UserRow>(query);
    return rows.map(row => new User({ ...row, password: "" }));  // Dummy to avoid type error
  }
}

// Ensure table exists (run once)
async function initDB(): Promise<void> {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(createTableQuery);
}

initDB().catch(console.error);

export default User;