const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const authToken = req.headers.authorization

  try {
    jwt.verify(authToken, process.env.TOKEN_SECRET)
  } catch {
    return res.status(403).json({
      error: "Ação não permitida. Faça login para continuar.",
    })
  }

  return next()
}
