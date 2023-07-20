import CategoryRepository from "../repositories/CategoryRepository"
import validate from "uuid-validate"
import { Request, Response } from "express";

class CategoryController {
  async index(req: Request, res: Response) {
    const { order } = req.query;
    const { user } = res.locals

    const categories = await CategoryRepository.findAll({
      order: order as "asc" | "desc",
      user_id: user.id
    });


    return res.json(categories);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = res.locals

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const category = await CategoryRepository.findById({
      id,
      user_id: user.id
    });

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    return res.json(category);
  }

  async store(req: Request, res: Response) {
    const { name } = req.body;
    const { user } = res.locals

    if (!name) {
      return res.status(400).json({ error: "Nome é um campo obrigatório" });
    }

    const category = await CategoryRepository.create({
      name,
      user_id: user.id
    });

    return res.status(201).json(category);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = res.locals

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nome é um campo obrigatório" });
    }

    const categoryExists = await CategoryRepository.findById({
      id,
      user_id: user.id
    });

    if (!categoryExists) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }


    const category = await CategoryRepository.update({
      id,
      user_id: user.id,
      body: { name }
    });

    return res.json(category);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = res.locals

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const category = await CategoryRepository.findById({
      id,
      user_id: user.id
    });

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    await CategoryRepository.delete({
      id,
      user_id: user.id
    });

    return res.sendStatus(204);
  }
}

export default new CategoryController();
