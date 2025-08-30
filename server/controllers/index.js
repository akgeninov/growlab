const loginController = require("./loginController");
const userControllers = require("./userControllers");
const artikelController = require("./artikelController");
const lowonganController = require("./lowonganController");
const kelasWishlistController = require("./kelasWishlistController");
const kelasBisnisController = require("./kelasBisnisController");
const userKelasController = require("./userKelasController");
// const testingController = require("./testingControllesrs");
const cmsAuthController = require('./cmsAuthController');
const pelamarController = require('./pelamarController');
const roleController = require('./roleController');
const accessController = require('./accessController');

module.exports = {
  loginController,
  userControllers,
  artikelController,
  lowonganController,
  kelasBisnisController,
  userKelasController,
  // testingController,
  cmsAuthController,
  pelamarController,
  roleController,
  accessController
};
