import db from "../../database"
import { ICategory } from "../types/category";

class CategoryRepository {
  async findAll(params: { order?: "asc" | "desc", user_id: string }) {
    const orderDirection = params.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const rows: Array<ICategory> = await db.query(`
    SELECT * FROM categories
    WHERE user_id = $1
    ORDER BY name ${orderDirection}`,
    [params.user_id]);

    return rows;
  }

  async findById(params: { id: string; user_id: string }) {
    const [row]: Array<ICategory | undefined> = await db.query(`
    SELECT * FROM categories
    WHERE id = $1 AND user_id = $2`,
    [params.id, params.user_id]);

    return row;
  }

  async create(body: { name: string; user_id: string }) {
    const [row]: Array<ICategory> = await db.query(`
    INSERT INTO categories(name, user_id)
    VALUES($1, $2)
    RETURNING *
    `, [body.name, body.user_id]);

    return row;
  }

  async update(params: { id: string, user_id: string, body: { name: string }}) {
    const [row] = await db.query(`
    UPDATE categories
    SET name = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *
    `, [params.body.name, params.id, params.user_id]);

    return row;
  }

  async delete(params: { id: string, user_id: string }) {
    await db.query(`
    DELETE FROM categories
    WHERE id = $1 AND user_id = $2
    `, [params.id, params.user_id]);
  }
}

export default new CategoryRepository();
