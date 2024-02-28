const express = require("express");
const variantController = require("./variant.controller");

const router = express.Router();

router.post("/", variantController.create);
router.get("/", variantController.getAll);
router.get("/:id", variantController.getById);
router.put("/:id", variantController.update);
router.delete("/:id", variantController.delete);
router.delete("/del/:id",variantController.del);
router.get("/search/:sku", variantController.searchBySku);

module.exports = router;
