require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const serviciosServices = require('../services/serviciosServices');


const services =new serviciosServices();


const uri = process.env.URI;

const router = express.Router();


router.get('/', async (req, res)=>{
    const { limit, offset } = req.query;
    const resultado =await services.find(limit, offset);
    if(resultado){
        res.status(200).render('../views/servicios.hbs', {servicios:resultado});
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
            res.status(404).send("No se encontró la información");
        }
})

//POST
router.post('/', async (req, res)=>{
    const body = req.body;
        const resultado = await services.insertOne(body);
        if(resultado){
            res.status(201).json({
                message: 'Se creó el servicio',
                resultado
            });
        }else{
            res.status(404).send("No se creó el servicio");
        }
})

router.post('/', async (req, res)=>{
    const body = req.body;
        const resultado = await services.insertMany(body);
        if(resultado){
            res.status(201).json({
                message: 'Se creó el servicio',
                resultado
            });
        }else{
            res.status(404).send("No se creó el servicio");
        }
})
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
    
    const nombre_servicio =req.body.nombre_servicio;
    const valor =req.body.valor;

        const resultado = await services.updateOne(id,nombre_servicio, valor);
        if(resultado){
            res.status(201).json({
                message: 'Se actualizó el servicio',
                resultado
            });
        }else{
            res.status(404).send("No se actualizó la cita");
        }
    
})
//UpdateMany
router.patch('/',async (req, res)=>{
    const estado=req.body.estado;
    const resultado = await services.actualizarMuchos(estado);
    if(resultado){
        res.status(201).json({
            message: 'Se actualizaron los servicios',
            resultado
        });
    }else{
        res.status(404).send("No se actualizaron los servicios");
    }
}
)

module.exports=router;
