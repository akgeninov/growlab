const router = require("express").Router();
const { artikelController } = require("../controllers");

router.get("/navbar", artikelController.getKategori);
router.post("/kategori", artikelController.getAllArtikelByKategori);
router.post("/menarik", artikelController.getArtikelMenarik);
router.get("/allArtikel", artikelController.getAllArtikel);

module.exports = router;
