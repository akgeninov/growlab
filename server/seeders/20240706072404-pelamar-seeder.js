'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pelamar', [
      {
        nama_lengkap: 'John Doe',
        email: 'john@example.com',
        alamat_domisili: '123 Main St',
        nomor_telepon: '123-456-7890',
        tempat_tanggalLahir: 'B, 9 n 2022',
        jenis_kelamin: 'Male',
        status_pendidikan: 'Graduated',
        jenjang_pendidikan: 'Bachelor',
        nama_perguruanTinggi: 'University',
        program_studi: 'Informatics',
        pengalaman: '2 years',
        posisi: 'Developer',
        link_form: 'example.com/form',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_lengkap: 'Jane Doe',
        email: 'jane@example.com',
        alamat_domisili: '456 Secondary St',
        nomor_telepon: '987-654-3210',
        tempat_tanggalLahir: 'B, 9 n 2022',
        jenis_kelamin: 'Female',
        status_pendidikan: 'Graduated',
        jenjang_pendidikan: 'Master',
        nama_perguruanTinggi: 'Tech University',
        program_studi: 'Computer Science',
        pengalaman: '3 years',
        posisi: 'Designer',
        link_form: 'example.com/form',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      // Tambahkan lebih banyak pelamar jika diperlukan
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pelamar', null, {});
  }
};
