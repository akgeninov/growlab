const db = require("../models");
const { Op } = require("sequelize");
const lowonganModel = db.lowongan_pekerjaan;
const departemenModel = db.departemen;
const periodePekerjaanModel = db.periode_pekerjaan;
const tipePekerjaanModel = db.tipe_pekerjaan;
const jenjangPekerjaanModel = db.jenjang_pekerjaan;

module.exports = {
  getAllDepartemen: async (req, res) => {
    try {
      const result = await departemenModel.findAll();

      res.status(200).send({
        message: "success",
        data: result,
      });
    }catch (error) {
      res.status(400).send({
        error: error.message,
      });
    }
  },
  getAllPeriodePekerjaan: async (req, res) => {
    try {
      const result = await periodePekerjaanModel.findAll();

      res.status(200).send({
        message: "success",
        data: result,
      });
    }catch (error) {
      res.status(400).send({
        error: error.message,
      });
    }
  },
  getAllTipePekerjaan: async (req, res) => {
    try {
      const result = await tipePekerjaanModel.findAll();

      res.status(200).send({
        message: "success",
        data: result,
      });
    }catch (error) {
      res.status(400).send({
        error: error.message,
      });
    }
  },
  getAllJenjangPekerjaan: async (req, res) => {
    try {
      const result = await jenjangPekerjaanModel.findAll();

      res.status(200).send({
        message: "success",
        data: result,
      });
    }catch (error) {
      res.status(400).send({
        error: error.message,
      });
    }
  },
  getAllLowongan: async (req, res) => {
    try {
      const result = await lowonganModel.findAll({
        attributes: {
          exclude: ["id_departemen"], // Mengecualikan kolom id_departemen
        },
        include: [
          { model: db.sequelize.model("departemen") },
          { model: db.sequelize.model("periode_pekerjaan") },
          { model: db.sequelize.model("tipe_pekerjaan") },
          { model: db.sequelize.model("jenjang_pekerjaan") },
        ],
      });

      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (error) {
      res.status(400).send({
        error: error.message,
      });
    }
  },
  getLowonganById: async (req, res) => {
    try {
      const result = await lowonganModel.findOne({
        where: {
          id: req.params.id_lowongan,
        },
        attributes: {
          exclude: ["id_departemen"], // Mengecualikan kolom id_departemen
        },
        include: [
          { model: db.sequelize.model("departemen") },
          { model: db.sequelize.model("periode_pekerjaan") },
          { model: db.sequelize.model("tipe_pekerjaan") },
          { model: db.sequelize.model("jenjang_pekerjaan") },
        ],
      });

      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (error) {
      res.status(400).send({
        error: error.message,
      });
    }
  },
  addLowongan: async (req, res) => {
    try {
      const newLowongan = await lowonganModel.create(req.body);
      res.status(201).json(newLowongan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  editLowongan: async (req, res) => {
    try {
        const { id_lowongan } = req.params;
        const updatedLowongan = await lowonganModel.update(req.body, {
            where: { id: id_lowongan },
        });

        if (updatedLowongan[0] === 1) {
            const updatedData = await lowonganModel.findOne({
                where: { id: id_lowongan },
                include: [
                    { model: db.sequelize.model("departemen") },
                    { model: db.sequelize.model("periode_pekerjaan") },
                    { model: db.sequelize.model("tipe_pekerjaan") },
                    { model: db.sequelize.model("jenjang_pekerjaan") },
                ],
            });

            res.status(200).send({
                message: "success",
                data: updatedData,
            });
        } else {
            throw new Error("Failed to update the job vacancy.");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  },
  deleteLowongan: async (req, res) => {
    try {
        const { id_lowongan } = req.params;
        const deletedLowongan = await lowonganModel.destroy({
            where: { id: id_lowongan },
        });

        if (deletedLowongan === 1) {
            res.status(200).send({
                message: "success",
                data: { id: id_lowongan },
            });
        } else {
            throw new Error("Failed to delete the job vacancy.");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  },
  searchLowongan: async (req, res) => {
    try {
        const { term } = req.query;
        const result = await lowonganModel.findAll({
            where: {
                [Op.or]: [
                    { nama_lowongan_pekerjaan: { [Op.like]: `%${term}%` } },
                    { deskripsi_lowongan_pekerjaan: { [Op.like]: `%${term}%` } },
                    { persyaratan_lowongan_pekerjaan: { [Op.like]: `%${term}%` } },
                    { '$departemen.nama_departemen$': { [Op.like]: `%${term}%` } } // Pencarian berdasarkan nama departemen
                ],
            },
            attributes: {
                exclude: ["id_departemen"],
            },
            include: [
                { 
                    model: db.sequelize.model("departemen"),
                    attributes: ['nama_departemen'] // Hanya ambil kolom nama_departemen
                },
                { model: db.sequelize.model("periode_pekerjaan") },
                { model: db.sequelize.model("tipe_pekerjaan") },
                { model: db.sequelize.model("jenjang_pekerjaan") },
            ],
        });

        if (!result || result.length === 0) {
          return res.status(404).send({
              message: "No data found",
          });
      }

        res.status(200).send({
            message: "success",
            data: result
        });

        console.log("term", term);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
},



};
