const router = require("express").Router();
const { userKelasController } = require("../controllers");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/all", verifyToken, userKelasController.kelasUserAll);
router.get("/nonProgess",verifyToken, userKelasController.kelasUserNonProgress);
router.get("/progress",verifyToken, userKelasController.kelasUserProgress);
router.get("/complete",verifyToken, userKelasController.kelasUserComplete);
router.get("/progress/last",verifyToken, userKelasController.kelasUserLastProgress);

module.exports = router;
