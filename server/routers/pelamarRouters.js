const router = require("express").Router();
const { pelamarController } = require("../controllers");

router.get("/allPelamar", pelamarController.getAllPelamar);
router.delete("/:id_pelamar", pelamarController.deletePelamar);

module.exports = router;
