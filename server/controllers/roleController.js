const { Role } = require("../models");

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json({
      status: "success",
      data: roles,
    });
  } catch (err) {
    console.error("Error getAllRoles:", err);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data role",
    });
  }
};

module.exports = { getAllRoles };
