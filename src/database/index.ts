import { Client } from "pg"
import schema from "./schema"

const client = new Client(process.env.DB_URL);

client.connect();

client.query(schema)

export default {
  async query (query: string, values?: any) {
    const { rows } = await client.query(query, values);
    return rows;
  }
}
