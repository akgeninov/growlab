const { Access } = require("../models");

exports.getAllAccesses = async (req, res) => {
  try {
    const accesses = await Access.findAll();
    res.status(200).json({
      status: "success",
      data: accesses,
    });
  } catch (error) {
    console.error("Error ambil accesses:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data accesses",
    });
  }
};
