const express = require("express");
const router = express.Router();
const Address = require("../models/address");
const ensuAuth = require("../middleware/authenticated");
const userController = require("../controllers/user")

router.post("/signup", userController.register);
router.post("/login", userController.login);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getById);
router.patch("/edit/:userId", [ensuAuth.ensureAuth], userController.updateUser);
router.delete("/delete/:userId", [ensuAuth.ensureAuth], userController.deleteUser);

module.exports = router;

