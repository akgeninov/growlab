const jwt = require("jsonwebtoken");
require("dotenv").config();

const makeJWT = (data) => {
  console.log({ data });
  const payload = {
    // id: data.id,
    // nama_user: data.nama_user,
    // no_hp: data.no_hp,
    email: data.email,
    // nama_bisnis: data.nama_bisnis,
    id_role: data.id_role,
  };
  const result = jwt.sign(payload, process.env.SECRET_JWT, {
    algorithm: "HS256",
    expiresIn: "30d",
    issuer: "Growlab",
  });
  return result;
};

const checkAvailableColumn = async (Model, column, value, res) => {
  try {
    const condition = {
      [column]: value,
    };

    const result = await Model.findOne({
      where: condition,
    });

    if (result) {
      return res.status(500).json({
        message: `${column} pada tabel ${Model.name} sudah digunakan.`,
        result: false,
      });
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error executing query: " + error);
    return res.status(401).json({ message: `Gagal Cek ${column} ! ` });
  }
};

const checkAvailableColumn2 = async (Model, column, value) => {
  try {
    const condition = {
      [column]: value,
    };

    const result = await Model.findOne({
      where: condition,
    });

    if (result) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error executing query: " + error);
    return false;
  }
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function createResponse(res, status, result, message, data = null) {
  if (data) {
    return res.status(status).json({ result, message, data });
  } else {
    return res.status(status).json({ result, message });
  }
}

module.exports = {
  makeJWT,
  checkAvailableColumn,
  checkAvailableColumn2,
  validateEmail,
  createResponse,
};
