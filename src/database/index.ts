import { Client } from "pg"

const client = new Client(process.env.DB_URL);

client.connect();

export default {
  async query (query: string, values?: any) {
    const { rows } = await client.query(query, values);
    return rows;
  }
}
