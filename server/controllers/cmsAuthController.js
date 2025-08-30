const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();
const auth = db.cms_auth;
const { cms_auth } = require("../models");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const userFind = await auth.findOne({
        where: {
          username,
        },
        attributes: ["id", "username", "email", "roleId", "accessId", "password"],
      });

      const passwordMatch = await bcrypt.compare(password, userFind.password);
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ status: "Failed", error: "Invalid password!" });
      }

      const token = jwt.sign(
        { id: userFind.id, roleId: userFind.roleId },
        process.env.SECRET_JWT,
        {
          algorithm: "HS256",
          expiresIn: "1h",
        }
      );

      const { password: _, ...userData } = userFind.toJSON();

      res.status(200).json({
        status: "Successfully",
        message: "Login Success!",
        token: token,
        user: userData
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  createUser: async (req, res) => {
    const { username, password, email, accessId, roleId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    auth
      .create({
        username: username,
        password: hashedPassword,
        email: email,
        accessId: accessId,
        roleId: roleId,
      })
      .then(() => {
        res.status(200).send("Account created!");
      })
      .catch((err) => console.log(err.message));
  },
  getAllUser: async (req, res) => {
    try {
      const admins = await auth.findAll({
        attributes: ["id", "username", "email", "roleId", "accessId", "createdAt", "updatedAt"],
      });

      if (admins.length === 0) {
        return res.status(404).json({
          status: "Failed",
          message: "No admin found",
        });
      }

      res.status(200).json({
        status: "Successfully",
        data: admins,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getProfile: async (req, res) => {
    try {
      const user = await auth.findByPk(req.dataToken.id, {
        attributes: ["id", "username", "email", "roleId", "accessId"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ data: user });
    } catch (err) {
      res.status(500).json({ message: "Error", error: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await auth.findByPk(id);
      if (!user) {
        return res.status(404).json({ status: "error", message: "User tidak ditemukan" });
      }

      await user.destroy();

      res.status(200).json({ status: "success", message: "User berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
  demoAuth: (req, res) => {
    res.send("Hello World!");
  },
};
