const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category")

router.post("/new-category", categoryController.createCategory)
router.get("/", categoryController.getAllCategories)
router.get("/:categoryId", categoryController.getCategoryById)
router.patch("/edit/:categoryId", categoryController.editCategory)
router.delete("/delete/:categoryId", categoryController.deleteCategory)

module.exports = router;