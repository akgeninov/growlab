'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pelamar', {
      id_lamaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_lengkap: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      alamat_domisili: {
        type: Sequelize.TEXT
      },
      nomor_telepon: {
        type: Sequelize.TEXT
      },
      tempat_tanggalLahir: {
        type: Sequelize.TEXT
      },
      jenis_kelamin: {
        type: Sequelize.TEXT
      },
      status_pendidikan: {
        type: Sequelize.TEXT
      },
      jenjang_pendidikan: {
        type: Sequelize.TEXT
      },
      nama_perguruanTinggi: {
        type: Sequelize.TEXT
      },
      program_studi: {
        type: Sequelize.TEXT
      },
      pengalaman: {
        type: Sequelize.TEXT
      },
      posisi: {
        type: Sequelize.TEXT
      },
      link_form: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pelamar');
  }
};