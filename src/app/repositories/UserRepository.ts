import db from "../../database"
import { IUser } from "../types/user"

class UserRepository {
  async findAll () {
    const rows: Array<IUser> = await db.query("SELECT * FROM users")
    return rows
  }

  async findById (params: { id: string }) {
    const [row]: Array<IUser | undefined> = await db.query("SELECT * FROM users WHERE id = $1", [params.id])
    return row
  }

  async findByEmail(params: { email: string; }) {
    const [row]: Array<IUser | undefined> = await db.query("SELECT * FROM users WHERE email = $1", [params.email]);

    return row;
  }

  async create(body: { name: string; email: string}) {
    const [row]: Array<IUser> = await db.query(`
      INSERT INTO users(name, email)
      VALUES($1, $2)
      RETURNING *
    `, [body.name, body.email])

    return row
  }

  async update(params: { id: string; body: { name: string, email: string }}) {
    const [row]: Array<IUser> = await db.query(`
      UPDATE users
      SET name = $1, email = $2
      WHERE id = $3
      RETURNING *
    `, [params.body.name, params.body.email, params.id])

    return row
  }

  async delete(params: { id: string; }) {
    await db.query("DELETE FROM users WHERE id = $1", [params.id]);
  }
}

export default new UserRepository()
