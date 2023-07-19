const ContactRepository = require("../repositories/ContactRepository");
const validate = require('uuid-validate');

class ContactController {
  async index(req, res) {
    const { order } = req.query;
    const {auth_user} = req

    const contacts = await ContactRepository.findAll(order, auth_user.id);
    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;
    const {auth_user} = req

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }

    const contact = await ContactRepository.findById(id, auth_user.id);


    if (!contact) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }

    return res.json(contact);
  }

  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;
    const {auth_user} = req

    const isCategoryIdInvalid = !validate(category_id, 4)
    if (isCategoryIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrado" });
    }

    if (!name) {
      return res.status(400).json({ error: "Nome é um campo obrigatório" });
    }

    const contactExists = await ContactRepository.findByEmail(email, auth_user.id);

    if (contactExists) {
      return res.status(400).json({ error: "Esse e-mail ja está em uso" });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id, user_id: auth_user.id
    });

    return res.status(201).json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const {auth_user} = req

    const isContactIdInvalid = !validate(id, 4)
    if (isContactIdInvalid) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }

    const {
      name, email, phone, category_id,
    } = req.body;


    const isCategoryIdInvalid = !validate(category_id, 4)
    if (isCategoryIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrado" });
    }

    if (!name) {
      return res.status(400).json({ error: "Nome é um campo obrigatório" });
    }

    const contactExists = await ContactRepository.findById(id, auth_user.id);

    if (!contactExists) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }


    const contactByEmail = await ContactRepository.findByEmail(email, auth_user.id);

    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: "Esse e-mail ja está em uso" });
    }

    const updatedContact = await ContactRepository.update(id, auth_user.id, {
      name, email, phone, category_id,
    });

    return res.json(updatedContact);
  }

  async delete(req, res) {
    const { id } = req.params;
    const {auth_user} = req

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }

    const contact = await ContactRepository.findById(id, auth_user.id);

    if (!contact) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }

    await ContactRepository.delete(id, auth_user.id);
    return res.sendStatus(204);
  }
}

module.exports = new ContactController();
