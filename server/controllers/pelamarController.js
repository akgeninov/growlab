const db = require("../models");
const pelamarModel = db.pelamar;

module.exports = {
  getAllPelamar: async (req, res) => {
    try {
      console.log("Trying to fetch data from database...");
      const result = await pelamarModel.findAll();
      console.log("Query result:", result); // Tambahkan logging untuk melihat hasil query
      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (error) {
      console.error("Error retrieving data:", error); // Tambahkan penanganan kesalahan untuk melihat pesan error
      res.status(400).send({
        error: error.message,
      });
    }
  },
  deletePelamar: async (req, res) => {
    try {
        const { id_pelamar } = req.params;
        const deletedPelamar = await pelamarModel.destroy({
            where: { id: id_pelamar },
        });

        if (deletedPelamar === 1) {
            res.status(200).send({
                message: "success",
                data: { id: id_pelamar },
            });
        } else {
            throw new Error("Failed to delete the pelamar.");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  },
};
