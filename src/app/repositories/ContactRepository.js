const db = require("../../database");

class ContactRepository {
  async findAll(order, user_id) {
    const orderDirection = order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.user_id = $1
    ORDER BY contacts.name ${orderDirection}
    `, [user_id]);
    return rows;
  }

  async findById(id, user_id) {
    const [row] = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1 AND contacts.user_id = $2
    `, [id, user_id]);
    return row;
  }

  async findByEmail(email, user_id) {
    const [row] = await db.query(`
    SELECT * FROM contacts
    WHERE email = $1 AND user_id = $2`
    , [email, user_id]);
    return row;
  }

  async create({
    name, email, phone, category_id, user_id
  }) {
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id, user_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `, [name, email, phone, category_id, user_id]);

    return row;
  }

  async update(id, user_id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5 AND user_id = $6
    RETURNING *
    `, [name, email, phone, category_id, id, user_id]);

    return row;
  }

  async delete(id, user_id) {
    await db.query(`
    DELETE FROM contacts
    WHERE id = $1 AND user_id = $2`
    , [id, user_id]);
  }
}

module.exports = new ContactRepository();
