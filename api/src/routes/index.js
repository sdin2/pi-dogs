require("dotenv").config();
const { Router } = require("express"); // uso el middleware express para poder usar los json que llegan por body
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Dog, Temp } = require("../db.js");
const { Op } = require("sequelize");
const router = Router();
var dog = require("./dog");
const temp = require("./temp");

router.use("/dog", dog);
router.use("/temperament", temp);

module.exports = router;
