const CategoryRepository = require("../repositories/CategoryRepository");
const validate = require('uuid-validate');
const UserRepository = require("../repositories/UserRepository");

class CategoryController {
  async index(req, res) {
    const { order } = req.query;
    const { auth_user } = req

    const categories = await CategoryRepository.findAll(order, auth_user.id);


    return res.json(categories);
  }

  async show(req, res) {
    const { id } = req.params;
    const { auth_user } = req

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const category = await CategoryRepository.findById(id, auth_user.id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    return res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;
    const { auth_user } = req

    if (!name) {
      return res.status(400).json({ error: "Nome é um campo obrigatório" });
    }

    const category = await CategoryRepository.create({ name, user_id: auth_user.id });

    return res.status(201).json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { auth_user } = req

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nome é um campo obrigatório" });
    }

    const categoryExists = await CategoryRepository.findById(id, auth_user.id);

    if (!categoryExists) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }


    const category = await CategoryRepository.update(id, { name, user_id: auth_user.id });

    return res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;
    const { auth_user } = req

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const category = await CategoryRepository.findById(id, auth_user.id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    await CategoryRepository.delete(id, auth_user.id);

    return res.sendStatus(204);
  }
}

module.exports = new CategoryController();
