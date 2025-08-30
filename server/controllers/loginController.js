const db = require("../models");
const user = db.User;
const role = db.Role;
const bcrypt = require("bcrypt");
const utility = require("./utility");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password, uid_firebase, display_name } = req.body;
      if (uid_firebase) {
        console.log({ uid: uid_firebase, display_name });
        const uidGoogleIsExist = await user.findOne({
          where: { uid_firebase },
        });

        if (uidGoogleIsExist) {
          console.log({ email: uidGoogleIsExist.email });
          const jwt = utility.makeJWT(uidGoogleIsExist);
          res.status(200).send({
            message: "succes",
            data: uidGoogleIsExist,
            token: jwt,
          });
        } else {
          const nama_depan = display_name.split(" ")[0];
          const nama_belakang = display_name.split(" ")[1];
          console.log({ nama_depan });
          const creatUser = await user.create({
            nama_lengkap: display_name,
            uid_firebase,
            email,
            id_role: 3,
            profile_picture: "chibi2.jpg",
            nama_depan,
            nama_belakang: nama_belakang || "",
            username: nama_depan.toLowerCase(),
          });

          const jwt = utility.makeJWT(creatUser);
          res.status(200).send({
            message: "succes",
            data: creatUser,
            token: jwt,
          });
        }
      } else {
        const existingUser = await user.findOne({
          where: { email },
        });

        if (!existingUser) {
          return res.status(404).json({ error: "User not found" });
        }
        console.log(password);
        console.log(existingUser.password);

        // const passwordMatch = await bcrypt.compare(
        //   password,
        //   existingUser.password
        // );

        // if (!passwordMatch) {
        //   return res.status(401).json({ error: "Invalid password" });
        // }
        console.log(existingUser);
        const jwt = utility.makeJWT(existingUser);
        res.status(200).json({
          message: "Login successful",
          user: existingUser,
          token: jwt,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  register: async (req, res) => {
    const { nama_lengkap, username, no_hp, email, password, konfirm_password } =
      req.body;

    //kofirmasi password
    if (konfirm_password !== password)
      return utility.createResponse(res, 400, false, "Password tidak sama");
    //checking structure email
    if (!utility.validateEmail(email))
      return utility.createResponse(res, 400, false, "Email Tidak Valid");
    //available username
    if (!(await utility.checkAvailableColumn2(user, "username", username)))
      return utility.createResponse(
        res,
        400,
        false,
        "username sudah digunakan"
      );
    //available email
    if (!(await utility.checkAvailableColumn2(user, "email", email)))
      return utility.createResponse(res, 400, false, "email sudah digunakan");
    //available no hp
    if (!(await utility.checkAvailableColumn2(user, "no_hp", no_hp)))
      return utility.createResponse(
        res,
        400,
        false,
        "nomor hp sudah digunakan"
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await user.create({
        nama_lengkap: nama_lengkap,
        username: username,
        password: hashedPassword,
        email: email,
        no_hp: no_hp,
        id_role: 3,
        profile_picture: "chibi2.jpg",
      });

      return utility.createResponse(
        res,
        201,
        true,
        "Pendaftaran Sukses",
        newUser
      );
    } catch (error) {
      return utility.createResponse(res, 500, false, error.message);
    }
  },
};
