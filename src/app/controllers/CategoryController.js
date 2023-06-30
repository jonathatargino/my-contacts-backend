const CategoryRepository = require("../repositories/CategoryRepository");

class CategoryController {
  async index(req, res) {
    const { order } = req.query;
    const categories = await CategoryRepository.findAll(order);

    return res.json(categories);
  }

  async show(req, res) {
    const { id } = req.params;
    const category = await CategoryRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await CategoryRepository.create({ name });

    return res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await CategoryRepository.update(id, { name });

    return res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await CategoryRepository.delete(id);

    return res.sendStatus(204);
  }
}

module.exports = new CategoryController();
