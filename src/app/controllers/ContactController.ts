import { Request, Response } from "express";

import ContactRepository from "../repositories/ContactRepository"
import validate from "uuid-validate"

class ContactController {
  async index(req: Request, res: Response) {
    const { order } = req.query;
    const { user } = res.locals

    const contacts = await ContactRepository.findAll({
      order: order as "asc" | "desc",
      user_id: user.id
    });

    res.json(contacts);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = res.locals

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }

    const contact = await ContactRepository.findById({
      id,
      user_id: user.id
    });


    if (!contact) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }

    return res.json(contact);
  }

  async store(req: Request, res: Response) {
    const {
      name, email, phone, category_id,
    } = req.body;
    const { user } = res.locals

    const isCategoryIdInvalid = !validate(category_id, 4)
    if (isCategoryIdInvalid) {
      return res.status(404).json({ error: "Categoria não encontrado" });
    }

    if (!name) {
      return res.status(400).json({ error: "Nome é um campo obrigatório" });
    }

    const contactExists = await ContactRepository.findByEmail({
      email,
      user_id: user.id
    });

    if (contactExists) {
      return res.status(400).json({ error: "Esse e-mail ja está em uso" });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      category_id,
      user_id: user.id
    });

    return res.status(201).json(contact);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = res.locals

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

    const contactExists = await ContactRepository.findById({
      id,
      user_id: user.id
    });

    if (!contactExists) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }


    const contactByEmail = await ContactRepository.findByEmail({
      email,
      user_id: user.id
    });

    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: "Esse e-mail ja está em uso" });
    }

    const updatedContact = await ContactRepository.update({
      id,
      user_id: user.id,
      body: {
        name,
        email,
        phone,
        category_id
      }
    });

    return res.json(updatedContact);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = res.locals

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }

    const contact = await ContactRepository.findById({
      id,
      user_id: user.id
    });

    if (!contact) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }

    await ContactRepository.delete({
      id,
      user_id: user.id
    });

    return res.sendStatus(204);
  }
}

export default new ContactController();
