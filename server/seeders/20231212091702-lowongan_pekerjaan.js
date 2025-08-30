'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("lowongan_pekerjaans", [
      // Data dummy
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Menghapus semua data pada tabel lowongan_pekerjaans
    return queryInterface.bulkDelete("lowongan_pekerjaans", null, {});
  }
};
