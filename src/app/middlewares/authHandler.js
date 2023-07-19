const jwt = require("jsonwebtoken")
const UserRepository = require("../repositories/UserRepository")

module.exports = async (req, res, next) => {
  const authToken = req.headers.authorization
  let userInfo = null

  try {
    userInfo = jwt.verify(authToken, process.env.TOKEN_SECRET)
  } catch {
    return res.status(403).json({
      error: "Ação não permitida. Faça login para continuar.",
    })
  }

  const authenticated_user_email = userInfo.emails[0].value

  const user = await UserRepository.findByEmail(authenticated_user_email)

  if (!user) {
    return res.status(404).json({error: "Usuário não encontrado"})
  }

  req.auth_user = user

  return next()
}
