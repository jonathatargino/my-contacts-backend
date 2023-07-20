import { Router } from "express"

const router = Router();

import ContactController from "../app/controllers/ContactController"

router.get("/contacts", ContactController.index);
router.get("/contacts/:id", ContactController.show);
router.post("/contacts", ContactController.store);
router.put("/contacts/:id", ContactController.update);
router.delete("/contacts/:id", ContactController.delete);

import CategoryController from "../app/controllers/CategoryController"

router.get("/categories", CategoryController.index);
router.get("/categories/:id", CategoryController.show);
router.post("/categories", CategoryController.store);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

import UserController from "../app/controllers/UserController"

router.get("/users", UserController.index)
router.get("/users/:id", UserController.show)
router.post("/users", UserController.store)
router.put("/users/:id", UserController.update)
router.delete("/users/:id", UserController.delete)

export default router;
