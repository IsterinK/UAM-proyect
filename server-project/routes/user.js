const express = require("express");
const router = express.Router();
const Address = require("../models/address");
const ensuAuth = require("../middleware/authenticated");
const userController = require("../controllers/user");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatar");
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, 'image-' + Date.now() + '.' + fileName); 
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post("/signup", upload.single("avatar"), userController.register);
router.post("/login", userController.login);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getById);
router.patch("/edit/:userId", [ensuAuth.ensureAuth], userController.updateUser);
router.delete("/delete/:userId", [ensuAuth.ensureAuth], userController.deleteUser);
router.get("/get-me/:user_id", [ensuAuth.ensureAuth], userController.getMe);

module.exports = router;

