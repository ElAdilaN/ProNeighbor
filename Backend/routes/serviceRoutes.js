const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/servicesController");

// Routes for services
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);
router.post("/", serviceController.createService);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);
router.get("/category/:category_id", serviceController.getServicesByCategory);
router.get("/search", serviceController.searchServices);

module.exports = router;
