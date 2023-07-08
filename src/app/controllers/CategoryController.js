const CategoryRepository = require("../repositories/CategoryRepository");
const validate = require('uuid-validate');

class CategoryController {
  async index(req, res) {
    const { order } = req.query;
    const categories = await CategoryRepository.findAll(order);

    return res.json(categories);
  }

  async show(req, res) {
    const { id } = req.params;

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    return res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Nome é um campo obrigatório" });
    }

    const category = await CategoryRepository.create({ name });

    return res.status(201).json(category);
  }

  async update(req, res) {
    const { id } = req.params;

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nome é um campo obrigatório" });
    }

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }


    const category = await CategoryRepository.update(id, { name });

    return res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    await CategoryRepository.delete(id);

    return res.sendStatus(204);
  }
}

module.exports = new CategoryController();
