const { Client } = require("pg");

const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

client.connect();
console.log("PICA PENIS");

exports.query = async (query) => {
  const { rows } = await client.query(query);
  return rows;
};
