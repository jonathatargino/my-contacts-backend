const { Router } = require("express");
const passport = require("passport")
const jwt = require("jsonwebtoken")

const router = Router();

router.get("/login/success", (req, res) => {
  if (req.user){
    const authToken = jwt.sign(req.user, process.env.TOKEN_SECRET)
    return res.redirect(`${process.env.FRONTEND_URL}/?authToken=${authToken}`)
  }

  res.status(403).json({error: true, message: "Not Authorized"})
})

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failure"
  })
})

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `/auth/login/success`,
    failureRedirect: "login/failed"
  })
)

router.get("/google", passport.authenticate("google", ["profile", "email"]))

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.FRONTEND_URL)
})

module.exports = router;

