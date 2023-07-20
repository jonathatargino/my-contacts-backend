import db from "../../database"
import { IContact, IContactPostOrPutResponse } from "../types/contact";

class ContactRepository {
  async findAll(params: { order?: "asc" | "desc", user_id: string }) {
    const orderDirection = params.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const rows: Array<IContact> = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.user_id = $1
    ORDER BY contacts.name ${orderDirection}
    `, [params.user_id]);

    return rows;
  }

  async findById(params: { id: string; user_id: string }) {
    const [row]: Array<IContact | undefined> = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1 AND contacts.user_id = $2
    `, [params.id, params.user_id]);

    return row;
  }

  async findByEmail(params: { email: string; user_id: string }) {
    const [row]: Array<IContact | undefined> = await db.query(`
    SELECT * FROM contacts
    WHERE email = $1 AND user_id = $2`
    , [params.email, params.user_id]);

    return row;
  }

  async create(body: {
    name: string,
    email: string,
    phone: string,
    category_id: string,
    user_id: string
  }) {
    const [row]: Array<IContactPostOrPutResponse> = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id, user_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `, [body.name, body.email, body.phone, body.category_id, body.user_id]);

    return row;
  }

  async update(params: {
    id: string;
    user_id: string;
    body :{
      name: string;
      email: string;
      phone: string;
      category_id: string;
    }
  }) {
    const { body, id, user_id } = params

    const [row]: Array<IContactPostOrPutResponse> = await db.query(`
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5 AND user_id = $6
    RETURNING *
    `, [body.name, body.email, body.phone, body.category_id, id, user_id]);

    return row;
  }

  async delete(params: { id: string; user_id: string }) {
    await db.query(`
    DELETE FROM contacts
    WHERE id = $1 AND user_id = $2`
    , [params.id, params.user_id]);
  }
}

export default new ContactRepository();
