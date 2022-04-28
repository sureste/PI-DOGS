const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Mood } = require('../db')


const axios = require('axios');
const e = require('express');
const router = Router();
const {API_KEY} = process.env

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getDbDogs = async () => {
    return await Dog.findAll()
}

const getDogsByDbName = async (name) => {

    const search = await Dog.findOne({where : {name : name}})

    return search
}
const DbDogId = async (id) => {

    let dog = await Dog.findByPk(id)
        ///////////////////////// falta hacer esta

}

const getApiDogs = async () => {

    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await api.data.map(e => {
        return {
            image : e.image.url,
            name : e.name,
            mood : e.temperament,
            weight : e.weight.metric,
            id : e.id
        }
    })
    return apiInfo
}

const getDogsByName = async (name) => {
    //perros     [{},{},{}]    

        // let dogs = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}?api_key=${API_KEY}`)

        // return dogs
        let dogs  = await getApiDogs();
        
        let search = await dogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))

        
        return search
}



const getDog = async (idRaza) => {

    let dogs = await getApiDogs();


    // let dog = await 
    let dog = await dogs.find(d => d.id === idRaza)
    
    return dog
}

const getMood = async () => {
    let mood = await Mood.findAll()
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
            await Mood.findOrCreate({
             where : {name : e}
            })
            
        }

    })
         mood = await Mood.findAll()

        }
        return  mood
    
}

const createDog = async (name,height,weight,lifeTime,mood) => {


    let newDog = await Dog.create({
    name,
    height,
    weight,
    lifeTime
    })
    console.log(newDog)


    let moods =  await getMood();
    Mood.findAll({
        where : {name : mood}
    })

    newDog.addMood(moods)

    console.log(newDog)

    console.log('====================')
    console.log(moods, "soy el getmetoooooo")
    
    // newDog.addMood(getMood)
    // console.log("========soy newDog=======", newDog)

    return "pan"
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
    let {idRaza} = req.body
    let{name} = req.query
    try {

        
        if(idRaza){
            let dbDog = await DbDogId(idRaza)
            let dog = await getDog(idRaza)
            res.status(200).json(dog)
        }
        
        if(name){
            let search = await getDogsByName(name)
            res.status(200).json(search)
        }
        
        let perros = await getApiDogs();
        res.status(200).json(perros)
        
        
    } catch (error) {
        res.status(404).send("soy un horror")
    }
})

router.post("/dogs", async(req,res) => {

    try{
        
        let {
            name,
            height,
            weight,
            lifeTime,
            mood} = req.body
            
            let created = createDog(name,height,weight,lifeTime,mood)
            
            res.status(200).json(created)
        } catch(e){
            res.status(404).send("cagaste bro")
        }

})

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
