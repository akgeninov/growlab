'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sub_materi_kelas", [
      {
        urutan:1,
        id_kelas_materi:1,
        nama: "Materi 1.",
        link: "https://youtu.be/6pRGiE55dYo?si=VeunatEd-LT9akVY",
        deskripsi:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tincidunt, nulla ac sagittis tempor, sapien mi gravida nunc, vel eleifend purus justo eu tellus. ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        urutan:2,
        id_kelas_materi:1,
        nama: "Materi 2.",
        link: "https://youtu.be/6pRGiE55dYo?si=VeunatEd-LT9akVY",
        deskripsi:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tincidunt, nulla ac sagittis tempor, sapien mi gravida nunc, vel eleifend purus justo eu tellus. ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        urutan:3,
        id_kelas_materi:1,
        nama: "Materi 3.",
        link: "https://youtu.be/6pRGiE55dYo?si=VeunatEd-LT9akVY",
        deskripsi:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tincidunt, nulla ac sagittis tempor, sapien mi gravida nunc, vel eleifend purus justo eu tellus. ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        urutan:4,
        id_kelas_materi:1,
        nama: "Materi 4.",
        link: "https://youtu.be/6pRGiE55dYo?si=VeunatEd-LT9akVY",
        deskripsi:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tincidunt, nulla ac sagittis tempor, sapien mi gravida nunc, vel eleifend purus justo eu tellus. ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sub_materi_kelas", null, {});
  }
};
