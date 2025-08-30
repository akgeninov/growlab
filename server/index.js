const express = require("express");
require("dotenv").config();
const db = require("./models");
const cors = require("cors");
const { join } = require("path");
const { URL, URLSearchParams } = require("url");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "images")));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  try {
    res.status(200).send({
      message: "this is my api",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

const { loginRouters, accessRouters } = require("./routers");
const { userRouters } = require("./routers");
const { artikelRouters } = require("./routers");
const { lowonganRouters } = require("./routers");
const { kelasBisnisRouters } = require("./routers");
const { userKelasRouters } = require("./routers");
const { kelasWishlistRouters } = require("./routers");
const { testingRouter } = require("./routers");
const { kelasTransaksiRouters } = require("./routers");
const { cmsAuthRouters } = require("./routers");
const { authorize } = require("./middleware/validator");
const { pelamarRouters } = require("./routers");
const { roleRouters } = require('./routers');
 // const Login = require("./config/logincms");

// app.get("/cms/auth", (req, res) => {
//   Login.findAll()
//     .then((data) => res.send(data))
//     .catch((err) => console.log(err.message));
// });

app.post("/cms", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  Login.create({
    username: username,
    password: hashedPassword,
  })
    .then(() => {
      res.status(200).send("Account created!");
    })
    .catch((err) => console.log(err.message));
});
app.post("/cms/auth", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFind = await Login.findOne({
      where: {
        username,
      },
    });

    const passwordMatch = await bcrypt.compare(password, userFind.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password!" });
    }
    
    const token = jwt.sign({ username: userFind.username }, process.env.SECRET_JWT, {
      algorithm: "HS256",
      expiresIn: "30d",
    })
    res.status(200).json({ 
      message: "Login Successfully!",
      token: token
     });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.use("/api/cms", cmsAuthRouters)
app.use("/api", authorize);
app.use("/api/auth", loginRouters);
app.use("/api/user", userRouters);
app.use("/api/userKelas", userKelasRouters);
app.use("/api/artikel", artikelRouters);
app.use("/api/lowongan", lowonganRouters);
app.use("/api/kelasBisnis", kelasBisnisRouters);
app.use("/api/kelasWishlist", kelasWishlistRouters);
// app.use("/api/testing", testingRouter);
app.use("/api/kelasTransaksi", kelasTransaksiRouters);
app.use("/api/pelamar", pelamarRouters);
app.use("/api/roles", roleRouters);
app.use("/api/access", accessRouters);

app.use("/images", express.static("images"));

app.listen(process.env.PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log(`server is running on port ${process.env.PORT}`);
});
