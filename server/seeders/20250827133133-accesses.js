"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("accesses", [
      {
        access: "karir",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        access: "kelas-bisnis",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        access: "artikel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("accesses", null, {});
  },
};
