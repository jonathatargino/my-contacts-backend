import { Request, Response } from "express"
import UserRepository from "../repositories/UserRepository"
import validate from "uuid-validate"

class UserController {
  async index (req: Request, res: Response) {
    const users = await UserRepository.findAll()
    return res.json(users)
  }

  async show (req: Request, res: Response) {
    const { id } = req.params

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({error: "Usuário não encontrado"})
    }

    const user = await UserRepository.findById({ id })

    if (!user) {
      return res.status(404).json({error: "Usuário não encontrado"})
    }

    return res.json(user)
  }

  async store (req: Request, res: Response) {
    const {name, email} = req.body

    if (!name) {
      return res.status(400).json({error: "Nome é um campo obrigatório"})
    }

    if (!email) {
      return res.status(400).json({error: "Email é um campo obrigatório"})
    }

    const userExists = await UserRepository.findByEmail({ email })
    if (userExists) {
      return res.status(400).json({ error: "Esse e-mail ja está em uso" });
    }

    const user = await UserRepository.create({ name, email })
    return res.json(user)
  }

  async storeByLogin (body: { name: string, email: string }) {
    const { name, email } = body

    if (!name) {
      throw new Error("Nome é um campo obrigatório")
    }

    if (!email) {
      throw new Error("Email é um campo obrigatório")
    }

    const userExists = await UserRepository.findByEmail({ email })
    if (userExists) return

    const user = await UserRepository.create({ name, email })
  }

  async update (req: Request, res: Response) {
    const { id } = req.params
    const { name, email } = req.body

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({error: "Usuário não encontrado"})
    }

    if (!name) {
      return res.status(400).json({error: "Nome é um campo obrigatório"})
    }

    if (!email) {
      return res.status(400).json({error: "Email é um campo obrigatório"})
    }

    const userExists = await UserRepository.findById({ id })

    if (!userExists) {
      return res.status(400).json({error: "Usuário não encontrado"})
    }

    const emailOwner = await UserRepository.findByEmail(email)

    if (emailOwner && emailOwner.id !== id) {
      return res.status(400).json({ error: "Esse e-mail ja está em uso" });
    }

    const updatedUser = await UserRepository.update({ id, body: { name, email }})

    return res.json(updatedUser)

  }

  async delete (req: Request, res: Response) {
    const { id } = req.params

    const isIdInvalid = !validate(id, 4)
    if (isIdInvalid) {
      return res.status(404).json({error: "Usuário não encontrado"})
    }

    const user = await UserRepository.findById({ id })

    if (!user) {
      return res.status(404).json({error: "Usuário não encontrado"})
    }

    await UserRepository.delete({ id })

    return res.sendStatus(204)
  }
}

export default new UserController()
