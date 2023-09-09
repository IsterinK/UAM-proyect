const express = require("express");
const router = express.Router();
const multer = require('multer');
const serviceController = require("../controllers/service")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/servicios') // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }); 
const upload = multer({ storage: storage });

router.post("/new-service", upload.any(), serviceController.createService)
router.get("/", serviceController.getAllServices)
router.get("/:serviceId", serviceController.getServiceById)
router.patch("/edit/:serviceId", serviceController.editService)
router.delete("/delete/:serviceId", serviceController.deleteService)

module.exports = router;