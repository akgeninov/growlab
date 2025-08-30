const express = require("express");
const router = express.Router();
const accessController = require("../controllers/accessController");

router.get("/getAllAccesses", accessController.getAllAccesses);

module.exports = router;
