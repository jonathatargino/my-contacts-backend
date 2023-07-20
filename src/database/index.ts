import { Client } from "pg"

const client = new Client({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

client.connect();

export default {
  async query (query: string, values?: any) {
    const { rows } = await client.query(query, values);
    return rows;
  }
}
