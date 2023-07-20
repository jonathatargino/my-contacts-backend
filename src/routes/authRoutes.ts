import { Router } from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import UserController from "../app/controllers/UserController"

const router = Router();

router.get("/login/success", (req, res) => {
  const user = req.user

  if (req.user){
    const authenticated_user_name = (user as any).displayName
    const authenticated_user_email = (user as any).emails[0].value

    UserController.storeByLogin({
      email: authenticated_user_email,
      name: authenticated_user_name
    })

    const authToken = jwt.sign(req.user, process.env.TOKEN_SECRET as string)
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

router.get("/google", passport.authenticate("google"))

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err)
  });

  res.redirect(process.env.FRONTEND_URL as string)
})

export default router;

