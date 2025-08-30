const router = require("express").Router();
const { cmsAuthController } = require("../controllers");
const { getProfile } = require("../controllers/cmsAuthController");
const { verifyToken } = require("../middleware/validation");

router.post("/login", cmsAuthController.loginUser);
router.post("/register", cmsAuthController.createUser);
router.get("/getAllUser", cmsAuthController.getAllUser);
router.get("/testing", verifyToken, cmsAuthController.demoAuth);
router.get("/profile", verifyToken, cmsAuthController.getProfile);
router.delete("/deleteUser/:id", cmsAuthController.deleteUser);

module.exports = router;
