const db = require("../../database");

class CategoryRepository {
  async findAll(order, user_id) {
    const orderDirection = order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(`
    SELECT * FROM categories
    WHERE user_id = $1
    ORDER BY name ${orderDirection}`,
    [user_id]);
    return rows;
  }

  async findById(id, user_id) {
    const [row] = await db.query(`
    SELECT * FROM categories
    WHERE id = $1 AND user_id = $2`,
    [id, user_id]);
    return row;
  }

  async create({ name, user_id }) {
    const [row] = await db.query(`
    INSERT INTO categories(name, user_id)
    VALUES($1, $2)
    RETURNING *
    `, [name, user_id]);

    return row;
  }

  async update(id, { name, user_id }) {
    const [row] = await db.query(`
    UPDATE categories
    SET name = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *
    `, [name, id, user_id]);

    return row;
  }

  async delete(id, user_id) {
    await db.query(`
    DELETE FROM categories
    WHERE id = $1 AND user_id = $2
    `, [id, user_id]);
  }
}

module.exports = new CategoryRepository();
