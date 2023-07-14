const { Router } = require("express");
const passport = require("passport")

const router = Router();

router.get("/auth/login/success", (req, res) => {
  if (req.user){
    res.status(200).json({
      error: false,
      message: "Successfully",
      user: req.user
    })
  }
})

router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failure"
  })
})

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONTEND_URL}/contacts`,
    failureRedirect: "login/failed"
  })
)

router.get("/auth/google", passport.authenticate("google", ["profile", "email"]))

router.get("/auth/logout", (req, res) => {
  req.logout();
  req.redirect(process.env.FRONTEND_URL)
})

const ContactController = require("./app/controllers/ContactController");

router.get("/contacts", ContactController.index);
router.get("/contacts/:id", ContactController.show);
router.post("/contacts", ContactController.store);
router.put("/contacts/:id", ContactController.update);
router.delete("/contacts/:id", ContactController.delete);

const CategoryController = require("./app/controllers/CategoryController");

router.get("/categories", CategoryController.index);
router.get("/categories/:id", CategoryController.show);
router.post("/categories", CategoryController.store);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

module.exports = router;
