const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        error: true,
        message: "Token not found!",
        isData: false,
        data: null,
      });
    }

    // Ambil token setelah "Bearer "
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT);
      req.dataToken = decoded; // simpan ke request
      next();
    } catch (error) {
      res.status(401).send({
        isError: true,
        message: "Invalid Token",
        data: null,
      });
    }
  },
};
