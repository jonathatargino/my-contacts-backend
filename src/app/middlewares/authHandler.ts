import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

import UserRepository from "../repositories/UserRepository"

export default async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization
  let userInfo = null

  try {
    userInfo = jwt.verify(authToken as string, process.env.TOKEN_SECRET as string)
  } catch {
    return res.status(403).json({
      error: "Ação não permitida. Faça login para continuar.",
    })
  }

  const authenticated_user_email = (userInfo as jwt.JwtPayload).emails[0].value

  const user = await UserRepository.findByEmail({email: authenticated_user_email})

  if (!user) {
    return res.status(404).json({error: "Usuário não encontrado"})
  }

  res.locals.user = user

  return next()
}
