const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Sequelize, Model} = require('sequelize')
const { Dogs , Moods } = require('../db')
const Op = Sequelize.Op

const axios = require('axios');
const e = require('express');
const router = Router();
const {API_KEY} = process.env

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// const getDbDogs = async () => {
//     return await Dogs.findAll({
//         include : {
//             model : Moods,
//             attributes : ["name"],
            
//         }
//     })
// }

// const getDogsByDbName = async (name) => {

//     const search = await Dogs.findAll({where : {name :{
//         [Op.like] : `%${name}%`}},
//         include : {
//             model: Moods,
//             attributes: ["name"],
//         },

//     })
//     return search
// }


const DbDogId = async (id) => {

    let dog = await Dogs.findByPk(id, {
        include : {
            model : Moods , 
            attributes : ["name"]

        }
    })

    if(dog === null){
        throw Error ("Perro no encontrato, WOOF WOOF WOOOF")
    } 

    console.log(dog)
    return dog
}

// const getApiDogs = async () => {
//     const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
//     const perrosApi = await api.data.map(e => {
//         return {
//             image: e.image.url,
//             name: e.name,
//             mood: e.temperament,
//             weight: e.weight.metric,
//             id: e.id
//         }
//             })
//         return perrosApi    

//         }

const getAllDogs = async () => {

    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const perrosApi = await api.data.map(e => {
        return {
            image : e.image.url,
            name : e.name,
            mood : e.temperament,
            weight : e.weight.metric,
            height : e.height.metric,
            id : e.id,
            lifeTime : e.life_span
        }
             })
        let perrosDb = await Dogs.findAll({
            include: {
                model: Moods,
                attributes: ["name"],

            }
        })

        let perros = perrosApi.concat(perrosDb)


    return perros
}

// const getDogsByName = async (name) => {
//     //perros     [{},{},{}]    
//         // name.toLowerCase()
//         // let dogs = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}?api_key=${API_KEY}`)

//         // return dogs
//         let dogs  = await getApiDogs();
//         let dbDogs = await getDbDogs();

//         // let perros = [...dogs , dbDogs]
        
//         let search = await dogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))

        
//         return search
// }



const getDog = async (id) => {
    let dogs = await getAllDogs()

    let foundDog = await dogs.find(d => d.id === parseInt(id))
    console.log(foundDog)
    if(!foundDog){
        throw Error("No hay guau guau api")
    }

 return foundDog

    
}

const getMood = async () => {
    let mood = await Moods.findAll()
    if(mood.length === 0){

        const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        // console.log(api)
        let perros =  api.data.map (el => el.temperament)
        
        // console.log("[" +moods+"]")
        
        
        
    perros = perros.join()


    perros = perros.split(",")

    perros = perros.map(e => e.trim())

    
    perros.forEach( async (e) => {
        
        if(e.length > 0){
            await Moods.findOrCreate({
             where : {name : e}
            })
            
        }

    })
         mood = await Moods.findAll()

        }
        return  mood
        
    }
    
    const createDog = async (name,height,weight,lifeTime,mood) => {
    try {
    //     const search = await Dogs.findOne({
    //         where : {name : name}})
    //  if(search){ 
    //      throw Error ("El perro ya existe")
    //     }
        
        // console.log("=====================",search, 'MIRAME SOY EL SEARCH')
        
        // Solo te manda un mood
        let [newDog,created] = await Dogs.findOrCreate({
            where : {
                name,
                height,
                weight,
                lifeTime
            }})
            console.log("WOOF WOOF WOOF WOOF WOOF",created) //regresar un 304 si ya estaba creado
            let moods = await Moods.findAll({
                where : {name : mood}
            })
            console.log(moods, "====el mood buscado===")
            let moods2 = moods.map(e => e.id);
            console.log(moods2 , "==esto es el moods2=")
            newDog.addMoods(moods2)
            console.log('====================')
            return "Perro creado con exito, AUUUUUUUUUUUU "
        } catch (error) {
            //checar si el control de errores sirve cuando la data no es enviada como un array de strings
            console.error(error)
        }
        }


    //encontrar manera de controlar errores mejor aquí 
router.get('/temperament', async(req,res) => {
    try{
        let a = await getMood()
    res.status(200).json(a)
    
}catch(err){
    res.status(404).send('Toy malito')
}
})


//meter control de errores para conseguir que solo puedan meter un tipo de request


router.get('/dogs', async(req,res) => {
    // let {id} = req.params
    let{name} = req.query
    try {
        
        if(name){
            
            let dogs = await getAllDogs()
            let search = await dogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            // let search = await getDogsByDbName(name)
            // let searchApi = await getDogsByName(name)  
            // if(!search && !searchApi){
                if(!search.length){
                    return res.status(404).send("No hay woof woof sniff sniff pffft")
                }
                return res.status(200).json(search)         
                }
                
                //el get de todos los perros ya completo, faltan detalles
                // let perrosApi = await getApiDogs()
                // let perrosDb = await getDbDogs()
                let perros = await getAllDogs() 
                
                return res.status(200).json(perros)
                
                
            } catch (error) {
                res.status(404).send({error : error.message})
            }
        })


        router.get("/dogs/:id", async(req,res) => {
            let {id} = req.params

            //cuando metes algo no tomado como valido de id UUID manda un error y ta bien pero 
            //podrías ver como controlarlo para mayor control sobre la pagina

            try {
                   if (id.length > 5) {
                        let dbDog = await DbDogId(id)
                        return res.status(200).json(dbDog)
                    }

                    let foundDog = await getDog(id)
                    // console.log(foundDog, "aquitoy")
                    return res.status(200).json(foundDog)
                
            } catch (error) {
             return res.status(404).send({Error : error.message})   
            }
            })
        

    
    
router.post("/dogs", async(req,res) => {
    // try{
        let {
            name,
            height,
            weight,
            lifeTime,
            mood} = req.body
    const search = await Dogs.findOne({
        where: { name: name }
    })
    if (search) {
        // console.log(search)
        return res.send("ya hay guau guau").status(304)
    }
            createDog(name,height,weight,lifeTime,mood)
            
            return res.status(201).send("Guau guau creado con croquetas")
            
        // } catch(e){
        // }

})







/////////////////////////////////////////////////////////////////////////
// router.get('/dogs',async(req,res) =>{
//     try {
//         

// let perros = await getApiDogs()
//         // console.log(perros)
//         res.status(200).json(perros)
//     } catch (err) {
//        res.status(404).json({error : err.message})
//     }
// })

// router.get('/dogs',async(req,res) => {
//     try {
//         const {name} = req.query
//         let search = await getDogsByName(name)
//         res.status(200).json(search)
//     } catch (e) {
//         res.status(404).json({error : e.message})
//     }
// })
module.exports = router;
