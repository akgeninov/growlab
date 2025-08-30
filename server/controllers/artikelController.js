const db = require("../models");
const artikelModel = db.Artikel;
const kategoriModel = db.Kategori;

module.exports = {
  getAllArtikel: async (req, res) => {
    try {
      const result = await artikelModel.findAll({
        include: [
          {
            model: kategoriModel,
            attributes: ["nama_kategori"],
          },
        ],
        order: [["id", "DESC"]],
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

  getKategori: async (req, res) => {
    try {
      const result = await kategoriModel.findAll({});

      res.status(200).send({
        message: "succes",
        data: result,
      });
    } catch (error) {
      res.status(400).send({
        error: error.message,
      });
    }
  },

  getAllArtikelByKategori: async (req, res) => {
    try {
      const { kategori } = req.body;
      let result = "";
      console.log({ res: kategori });
      if (kategori.toUpperCase() === "SEMUA") {
        result = await artikelModel.findAll({
          include: [
            {
              model: kategoriModel,
              attributes: ["nama_kategori"],
            },
          ],
        });
      } else {
        result = await artikelModel.findAll({
          include: [
            {
              model: kategoriModel,
              attributes: ["nama_kategori"],
              where: {
                nama_kategori: kategori,
              },
            },
          ],
        });
      }

      res.status(200).send({
        message: "succes",
        data: result,
      });
    } catch (error) {
      res.status(400).send({
        error: error.message,
      });
    }
  },

  getArtikelMenarik: async (req, res) => {
    try {
      const { kategori, limit } = req.body;
      const numericLimit = parseInt(limit, 10);

      if (kategori.toUpperCase() === "SEMUA") {
        result = await artikelModel.findAll({
          include: [
            {
              model: kategoriModel,
              attributes: ["nama_kategori"],
            },
          ],
          limit: numericLimit,
          order: [["id", "DESC"]],
        });
      } else {
        result = await artikelModel.findAll({
          include: [
            {
              model: kategoriModel,
              attributes: ["nama_kategori"],
              where: {
                nama_kategori: kategori,
              },
            },
          ],
          limit: numericLimit,
          order: [["id", "DESC"]],
        });
      }

      res.status(200).send({
        message: "succes",
        data: result,
      });
    } catch (error) {
      res.status(400).send({
        error: error.message,
      });
    }
  },
};
