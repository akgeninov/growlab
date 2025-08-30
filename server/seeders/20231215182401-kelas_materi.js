"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("kelas_materi", [
      {
        materi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        link: "https://youtu.be/6pRGiE55dYo?si=VeunatEd-LT9akVY",
        deskripsi:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tincidunt, nulla ac sagittis tempor, sapien mi gravida nunc, vel eleifend purus justo eu tellus. ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        link: "https://youtu.be/6pRGiE55dYo?si=VeunatEd-LT9akVY",
        deskripsi:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tincidunt, nulla ac sagittis tempor, sapien mi gravida nunc, vel eleifend purus justo eu tellus. ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        link: "https://youtu.be/6pRGiE55dYo?si=VeunatEd-LT9akVY",
        deskripsi:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tincidunt, nulla ac sagittis tempor, sapien mi gravida nunc, vel eleifend purus justo eu tellus. ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        link: "https://youtu.be/6pRGiE55dYo?si=VeunatEd-LT9akVY",
        deskripsi:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tincidunt, nulla ac sagittis tempor, sapien mi gravida nunc, vel eleifend purus justo eu tellus. ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("kelas_materi", null, {});
  },
};
