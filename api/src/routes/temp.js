require("dotenv").config();
const { Router } = require("express"); // uso el middleware express para poder usar los json que llegan por body
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const router = Router();
const { Dog, Temp } = require("../db.js");
const { Op } = require("sequelize");
const apiKey  = process.env;

router.get('/', async (req, res) => {
    try{
        let typesTemp = await Temp.findAll({ 
            order: [
            ['name', 'ASC'],
        ],});
        // console.log(typesDiet);
        
        res.status(200).json(typesTemp);
    } catch (error) {
        console.error(error);
        return ([])
    }
})


module.exports = router;