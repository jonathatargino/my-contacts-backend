const ContactRepository = require("../repositories/ContactRepository");
const validate = require('uuid-validate');

class ContactController {
  async index(req, res) {
    const { order } = req.query;
    const contacts = await ContactRepository.findAll(order);
    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const contact = await ContactRepository.findById(id);


    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    return res.json(contact);
  }

  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: "This e-mail is already in use" });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    return res.status(201).json(contact);
  }

  async update(req, res) {
    const { id } = req.params;

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: "This e-mail is already in use" });
    }

    const updatedContact = await ContactRepository.update(id, {
      name, email, phone, category_id,
    });

    return res.json(updatedContact);
  }

  async delete(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: "User not found" });
    }

    await ContactRepository.delete(id);
    return res.sendStatus(204);
  }
}

module.exports = new ContactController();
