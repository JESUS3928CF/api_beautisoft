require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const citasServices = require('../services/citasServices');

const async = require('hbs/lib/async');


const services =new citasServices();

const uri = process.env.URI;

const router = express.Router();




router.get('/', async (req, res)=>{
    
    const resultado =await services.find();
    if(resultado){
        res.status(200).render('../views/citas.hbs', {citas:resultado});
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
router.post('/', async (req, res)=>{
    const body = req.body;
        const resultado = await services.insertOne(body);
        if(resultado){
            res.status(201).json({
                message: 'Se creo la cita',
                resultado
            });
        }else{
            res.status(404).send("No se creó la cita");
        }
})

// router.post('/', async (req, res)=>{
//     const body = req.body;
//         const resultado = await services.insertMany([body]);
//         if(resultado){
//             res.status(201).send('Se insertaron varios documentos');
//         }else{
//             res.status(404).send("No se creó la cita");
//         }
// })



//DELETE
router.delete('/:id', async (req, res)=>{
    const id = req.params.id;
        const resultado = await services.deleteOne(id);
        if(resultado){
            res.status(200).send(resultado);
        }else{
            res.status(404).send("No se encontro la información");
        }
})

//UpdateOne
router.patch('/:id', async (req, res)=>{
    const id = req.params.id;
    
    const nombre =req.body.nombre;
    const apellido =req.body.apellido;

        const resultado = await services.updateOne(id,nombre, apellido);
        if(resultado){
            res.status(201).json({
                message: 'Se actualizó la cita',
                resultado
            });
        }else{
            res.status(404).send("No se actualizó la cita");
        }
    
})

//updateMany
router.put('/',async (req, res)=>{
    const estado=req.body.estado;
    const resultado = await services.actualizarMuchos(estado);
    if(resultado){
        res.status(201).json({
            message: 'Se actualizaron las citas',
            resultado
        });
    }else{
        res.status(404).send("No se actualizaron las citas");
    }
}
)
//LOOKUPS
router.get('/:servicios/:Id_servicio/:Id_servicio1/:alias',async (req, res)=>{
    const servicios=req.params.servicios;
    const Id_servicios=req.params.Id_servicio;
    const Id_servicio1=req.params.Id_servicio1;
    const alias = req.params.alias;
    const resultado = await services.pipeline(servicios, Id_servicios, Id_servicio1, alias);
    if(resultado){
        res.status(201).send(resultado);
    }else{
        res.status(404).send("No se pudo hacer lookups");
    }
}
)

module.exports=router;
