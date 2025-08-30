'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pelamar extends Model {
    // static associate(models) {
    // }
  }
  pelamar.init({
    nama_lengkap: DataTypes.TEXT,
    email: DataTypes.TEXT,
    alamat_domisili: DataTypes.TEXT,
    nomor_telepon: DataTypes.TEXT,
    tempat_tanggalLahir: DataTypes.TEXT,
    jenis_kelamin: DataTypes.TEXT,
    status_pendidikan: DataTypes.TEXT,
    jenjang_pendidikan: DataTypes.TEXT,
    nama_perguruanTinggi: DataTypes.TEXT,
    program_studi: DataTypes.TEXT,
    pengalaman: DataTypes.TEXT,
    posisi: DataTypes.TEXT,
    link_form: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'pelamar',
  });
  return pelamar;
};