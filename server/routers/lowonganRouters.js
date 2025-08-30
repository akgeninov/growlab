const router = require("express").Router();
const { lowonganController } = require("../controllers");

router.get("/departemen", lowonganController.getAllDepartemen);
router.get("/periode-pekerjaan", lowonganController.getAllPeriodePekerjaan);
router.get("/tipe-pekerjaan", lowonganController.getAllTipePekerjaan);
router.get("/jenjang-pekerjaan", lowonganController.getAllJenjangPekerjaan);
router.get("/allLowongan", lowonganController.getAllLowongan);
router.get("/:id_lowongan", lowonganController.getLowonganById);
router.post('/create', lowonganController.addLowongan);
router.put("/:id_lowongan", lowonganController.editLowongan);
router.delete("/:id_lowongan", lowonganController.deleteLowongan);
router.get("/search", lowonganController.searchLowongan);

module.exports = router;
