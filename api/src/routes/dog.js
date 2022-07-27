require("dotenv").config();
const { Router } = require("express"); // uso el middleware express para poder usar los json que llegan por body
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const router = Router();
const { Dog, Temp } = require("../db.js");
const { Op } = require("sequelize");
const apiKey  = process.env;


// casos: "NaN" - ["NaN - numero"] - ["numero - NaN"] -"numero"- NO EXISTA en metric pero si en imperials - que no exista - que en imperial sea letras distintas de NaN
const apiData = async ()=>{
    const allApi=await axios.get(`https://api.thedogapi.com/v1/breeds`)
    const dogApi= await allApi.data.map((e)=>{
        return{
            name : e.name,

            id : e.id,

            heightmax : e.height.metric && e.height.metric.split(" - ").filter(e=>Number(e)).length>1 ?
            e.height.metric.split(" - ").filter(e=>Number(e))[1] 
            : e.height.metric && e.height.metric.split(" - ").filter(e=>Number(e)).length===1 ?
            e.height.metric.split(" - ").filter(e=>Number(e))[0] 
            : !e.height.metric && e.height.imperial.split(" - ").filter(e=>Number(e)).length>1 ?
            (e.height.imperial.split(" - ").filter(e=>Number(e))[1]*0.45) 
            : e.height.imperial.split(" - ").filter(e=>Number(e)).length===1?
            (e.height.imperial.split(" - ").filter(e=>Number(e))[0]*0.45) 
            : "No hay datos",
            
            heightmin : e.height.metric && e.height.metric.split(" - ").filter(e=>Number(e)).length>1 ?
            e.height.metric.split(" - ").filter(e=>Number(e))[0] 
            : e.height.imperial && e.height.imperial.split(" - ").filter(e=>Number(e)).length>1?
            e.height.imperial.split(" - ").filter(e=>Number(e))[0]*0.45
            : "No hay datos",
            
            weightmin :e.weight.metric && e.weight.metric.split(" - ").filter(e=>Number(e)).length>1 ?
            e.weight.metric.split(" - ")[0] 
            : e.weight.imperial && e.weight.imperial.split(" - ").filter(e=>Number(e)).length>1?
            Math.round(e.weight.imperial.split(" - ").filter(e=>Number(e))[1]*0.45).toString()
            : "No hay datos",
            
            weightmax :e.weight.metric && e.weight.metric.split(" - ").filter(e=>Number(e)).length>1 ? 
            e.weight.metric.split(" - ").filter(e=>Number(e))[1] 
            : e.weight.metric && e.weight.metric.split(" - ").filter(e=>Number(e)).length===1 ?
            e.weight.metric.split(" - ").filter(e=>Number(e))[0] 
            : !e.weight.metric && e.weight.imperial.split(" - ").filter(e=>Number(e)).length>1 ?
            (e.weight.imperial.split(" - ").filter(e=>Number(e))[1]*0.45) 
            : e.weight.imperial.split(" - ").filter(e=>Number(e)).length===1?
            (e.weight.imperial.split(" - ").filter(e=>Number(e))[0]*0.45) 
            : "No hay datos",
            
            life_span : e.life_span ? e.life_span: "Sin definir",

            image:e.image.url,

            temperament: e.temperament ? e.temperament : "Sin definir",
            
            breed:e.breed_group ? e.breed_group : "Sin definir"
        }
    })
    return dogApi
}


const dbinfo= async ()=> {
    let database = await Dog.findAll({
        include: {
            model: Temp,
        },
    });
    return database;
};



router.get("/",async(req,res,next)=>{
try{
    let name=req.query.name
    let DogNameApi=await apiData()
    let DogNameDb=await dbinfo()
    let DogNameAll= DogNameApi.concat(DogNameDb)
    if(name){
        let dogNameFilter= DogNameAll.filter((e)=>e.name.toLowerCase().includes(name.toLowerCase()))
        dogNameFilter.length>0 ? res.status(200).send(dogNameFilter) : res.status(200).send("no se encontro perro con ese nombre")   
}
else{
    const dogAll= DogNameApi.concat(DogNameDb)
    return res.status(200).send(dogAll)
}
}
catch (error) {
    console.error(error);
    return ([])
}
})

router.get("/:id", async(req,res,next)=>{
    try {
    let id=req.params.id
    let DogIdApi=await apiData()
    let DogIdDb=await dbinfo()
    let DogIdAll= DogIdApi.concat(DogIdDb)
    let dogFilter= DogIdAll.filter((e)=>
    id==e.id)
    dogFilter.length ? res.status(200).send(dogFilter) : res.status(200).send("no se encontro perro con esa id")
    } catch (error) {
        console.error(error);
        return ([]) 
    }
})

router.post("/", async(req,res,next)=>{
    let {name,heightmax,weightmax,weightmin,heightmin,life_span,createInDb,temperament,breed,image}=req.body;
    let temperamentos=temperament.split(",")
    let tempArray=[]
    let nameMayusc=name.split("")
    nameMayusc[0]=nameMayusc[0].toUpperCase()
    name=nameMayusc.join("")
    let breedMayusc=breed.split("")
    breedMayusc[0]=breedMayusc[0].toUpperCase()
    breed=breedMayusc.join("")
    temperamentos.forEach(e=>{
    e=e.trim()
     let a=e.split("")
     a[0]=a[0].toUpperCase()
     a=a.join("")
    // console.log(a)
    tempArray.push(a)
    })
    // console.log(tempArray)
    let dogCreate=await Dog.create ({name,heightmax,weightmax,weightmin,heightmin,life_span,createInDb,breed,image,temperament});
    tempArray.forEach(async e => {
        let temperamentDB= await Temp.findOrCreate({
            where: {name : e}
          })
    });
    
      res.send("perro creado con exito")
})


module.exports = router;