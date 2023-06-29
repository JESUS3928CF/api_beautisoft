require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const estilistaServices = require('../services/estilistaServices');

const hbs=require('hbs');

const services =new estilistaServices();


const uri = process.env.URI;

const router = express.Router();



router.get('/', async (req, res)=>{
    const { limit, offset } = req.query;
    const resultado =await services.find(limit, offset);
    if(resultado){
        res.status(200).render('../views/estilista.hbs', {title:resultado});
    }else{
        res.status(404).send("No se encontro la informacion");
    }
})


router.get('/:id', async (req, res)=>{
    const id = req.params.id;
        const resultado = await services.findOne(id);
        if(resultado){
            res.status(200).send(resultado);
        }else{
            res.status(404).send("No se encontro la información");
        }
})

//POST

// router.get('/create', async(req, res)=>{
//     res.render('../views/formularioEstilista.hbs')
// })

router.post('/create', async (req, res)=>{
    const Id_estilista =  req.body.Id_estilista;
    const nombre = req.body.nombre;
    const apellido= req.body.apellido;
    const email = req.body.email;
        const resultado = await services.insertOne(Id_estilista, nombre,apellido,email);

        if(resultado){
            res.redirect('../views/estilista.hbs')
        }else{
            res.status(404).send("No se creó el estilista");
        }
})

// router.post('/', async (req, res)=>{
//     const body = req.body;
//         const resultado = await services.insertMany(body);
//         if(resultado){
//             res.status(201).json({
//                 message: 'Se creo los estilista',
//                 resultado
//             });
//         }else{
//             res.status(404).send("No se creó el estilista");
//         }
// })
//DELETE
router.get('/eliminar/:id', async (req, res)=>{
    const id = req.params.id;
        const resultado = await services.deleteOne(id);
        if(resultado){
            res.status(200).send(resultado);
        }else{
            res.status(404).send("No se encontro la información");
        }

    res.redirect('/views/estilista.hbs')    
    }
    
    
    )

//UpdateOne
router.patch('/:id', async (req, res)=>{
    const id = req.params.id;
    
    const nombre =req.body.nombre;
    const apellido =req.body.apellido;

        const resultado = await services.updateOne(id,nombre, apellido);
        if(resultado){
            res.status(201).json({
                message: 'Se actualizó el estilista',
                resultado
            });
        }else{
            res.status(404).send("No se actualizó el estilista");
        }
    
})

//updateMany
router.patch('/',async (req, res)=>{
    const estado=req.body.estado;
    const resultado = await services.actualizarMuchos(estado);
    if(resultado){
        res.status(201).json({
            message: 'Se actualizaron los estilistas',
            resultado
        });
    }else{
        res.status(404).send("No se actualizaron los estilistas");
    }
}
)

module.exports=router;
