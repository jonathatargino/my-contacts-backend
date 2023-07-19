const db = require("../../database/index")

class UserRepository {
  async findAll () {
    const rows = await db.query("SELECT * FROM users")
    return rows
  }

  async findById (id) {
    const [row] = await db.query("SELECT * FROM users WHERE id = $1", [id])
    return row
  }

  async findByEmail(email) {
    const [row] = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return row;
  }

  async create({name, email}) {
    const [row] = await db.query(`
      INSERT INTO users(name, email)
      VALUES($1, $2)
      RETURNING *
    `, [name, email])

    return row
  }

  async update(id, {name, email}) {
    const [row] = await db.query(`
      UPDATE users
      SET name = $1, email = $2
      WHERE id = $3
      RETURNING *
    `, [name, email, id])

    return row
  }

  async delete(id) {
    await db.query("DELETE FROM users WHERE id = $1", [id]);
  }
}

module.exports = new UserRepository()