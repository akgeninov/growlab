const {
  sequelize,
  kelas_bisnis,
  kelas_regist,
  kelas_detail,
  kelas_materi,
  sub_materi_kelas,
  User,
} = require("../models");
const { Op } = require("sequelize");

module.exports = {
  kelasUserAll: async (req, res) => {
    try {
      const userData = req.dataToken;
      const getUser = await User.findOne({
        where: {
          email: userData.email,
        },
      });
      if (!getUser) {
        throw new Error("User not Found");
      }
      //   const { userID } = req.body;

      const result = await kelas_bisnis.findAll({
        include: [
          {
            model: kelas_regist,
            attributes: ["progress"],
            where: { id_user: getUser.id },
          },
          { model: kelas_detail, attributes: [] },
        ],
        attributes: [
          "id",
          "nama",
          "image",
          "images_link",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM kelas_detail_materi WHERE kelas_detail_materi.id_kelas_detail = kelas_detail.id)"
            ),
            "total_materi",
          ],
          [
            sequelize.literal(
              `ROUND(kelas_regists.progress * 100 / (SELECT COUNT(*) FROM kelas_detail_materi WHERE kelas_detail_materi.id_kelas_detail = kelas_detail.id))`
            ),
            "persentase",
          ],
        ],
      });

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

  kelasUserNonProgress: async (req, res) => {
    try {
      //   const { userID } = req.body;
      const userData = req.dataToken;
      const getUser = await User.findOne({
        where: {
          email: userData.email,
        },
      });
      if (!getUser) {
        throw new Error("User not Found");
      }

      const result = await kelas_bisnis.findAll({
        include: [
          {
            model: kelas_regist,
            attributes: ["progress"],
            where: { id_user: getUser.id },
          },
          { model: kelas_detail, attributes: [] },
        ],
        attributes: [
          "id",
          "nama",
          "image",
          "images_link",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM kelas_detail_materi WHERE kelas_detail_materi.id_kelas_detail = kelas_detail.id)"
            ),
            "total_materi",
          ],
          [
            sequelize.literal(
              `ROUND(kelas_regists.progress * 100 / (SELECT COUNT(*) FROM kelas_detail_materi WHERE kelas_detail_materi.id_kelas_detail = kelas_detail.id))`
            ),
            "persentase",
          ],
        ],
        having: sequelize.literal("persentase = 0"),
      });

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

  kelasUserProgress: async (req, res) => {
    try {
      //   const { userID } = req.body;
      const userData = req.dataToken;
      const getUser = await User.findOne({
        where: {
          email: userData.email,
        },
      });
      if (!getUser) {
        throw new Error("User not Found");
      }

      const result = await kelas_bisnis.findAll({
        include: [
          {
            model: kelas_regist,
            attributes: ["progress"],
            where: { id_user: getUser.id },
          },
          { model: kelas_detail, attributes: [] },
        ],
        attributes: [
          "id",
          "nama",
          "image",
          "images_link",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM kelas_detail_materi WHERE kelas_detail_materi.id_kelas_detail = kelas_detail.id)"
            ),
            "total_materi",
          ],
          [
            sequelize.literal(
              `ROUND(kelas_regists.progress * 100 / (SELECT COUNT(*) FROM kelas_detail_materi WHERE kelas_detail_materi.id_kelas_detail = kelas_detail.id))`
            ),
            "persentase",
          ],
        ],
        having: sequelize.literal("persentase BETWEEN 1 AND 99"),
      });

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

  kelasUserComplete: async (req, res) => {
    try {
      //   const { userID } = req.body;
      const userData = req.dataToken;
      const getUser = await User.findOne({
        where: {
          email: userData.email,
        },
      });
      if (!getUser) {
        throw new Error("User not Found");
      }

      const result = await kelas_bisnis.findAll({
        include: [
          {
            model: kelas_regist,
            attributes: ["progress"],
            where: { id_user: getUser.id },
          },
          { model: kelas_detail, attributes: [] },
        ],
        attributes: [
          "id",
          "nama",
          "image",
          "images_link",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM kelas_detail_materi WHERE kelas_detail_materi.id_kelas_detail = kelas_detail.id)"
            ),
            "total_materi",
          ],
          [
            sequelize.literal(
              `ROUND(kelas_regists.progress * 100 / (SELECT COUNT(*) FROM kelas_detail_materi WHERE kelas_detail_materi.id_kelas_detail = kelas_detail.id))`
            ),
            "persentase",
          ],
        ],
        having: sequelize.literal("persentase = 100"),
      });

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

  kelasUserLastProgress: async (req, res) => {
    try {
      //   const { userID } = req.body;
      const userData = req.dataToken;
      const getUser = await User.findOne({
        where: {
          email: userData.email,
        },
      });
      if (!getUser) {
        throw new Error("User not Found");
      }

      const result = await kelas_bisnis.findAll({
        include: [
          {
            model: kelas_regist,
            attributes: ["progress"],
            where: { id_user: getUser.id },
          },
          { model: kelas_detail, attributes: [], as: "kelas_detail" },
        ],
        attributes: [
          "id",
          "nama",
          "image",
          "images_link",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM kelas_detail_materi WHERE kelas_detail_materi.id_kelas_detail = kelas_detail.id)"
            ),
            "total_materi",
          ],
          [
            sequelize.literal(
              `ROUND(kelas_regists.progress * 100 / (SELECT COUNT(*) FROM kelas_detail_materi WHERE kelas_detail_materi.id_kelas_detail = kelas_detail.id))`
            ),
            "persentase",
          ],
        ],
        order: [[{ model: kelas_regist }, "updatedAt", "DESC"]],
      });

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
