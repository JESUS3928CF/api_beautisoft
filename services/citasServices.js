require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId} = require('mongodb'); //ObjectId: Para poder trabajar con id



const uri = process.env.URI;

const router = express.Router();

class citasServices{
    constructor(){}
//------------------find------//

async find(limit, offset){
  const cliente = new MongoClient(uri);
  try{
      await cliente.connect();
      const resultado = await cliente.db("Beautysoft").collection("citasJhon").find({}).skip(Number(offset)).limit(Number(limit)).toArray();
      return resultado;
  }catch(e){
      console.log(e);
  }finally{
      await cliente.close();
  }
}    


//2. findOne()
async findOne(id){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const resultado =  await client.db('Beautysoft').collection('citasJhon').findOne({_id: new ObjectId(id)});
        return resultado;
    } catch (e) {
        console.log(e);
    }finally{
        await client.close();
    }
}

//InsertOne
async insertOne(body){
    const cliente =new MongoClient(uri);
    try {
        await cliente.connect()
        const resultado= await cliente.db('Beautysoft').collection('citasJhon').insertOne(body);
        return resultado;
    } catch (error) {
        console.log(error);
    }finally{
        await cliente.close()
    }
}

//InsertMany

async insertMany(body){
  const cliente =new MongoClient(uri);
  try {
      await cliente.connect()
      const resultado= await cliente.db('Beautysoft').collection('citasJhon').insertMany(body);
      return resultado;
  } catch (error) {
      console.log(error);
  }finally{
      await cliente.close()
  }
}

//DeletOne
async deleteOne(id){
  const client = new MongoClient(uri);
  try {
      await client.connect();
      const resultado =  await client.db('Beautysoft').collection('citasJhon').deleteOne({_id: new ObjectId(id)});
      return resultado;
  } catch (e) {
      console.log(e);
  }finally{
      await client.close();
  }
}

//UPDATEONE

async updateOne(id,nombre,apellido){
  const client = new MongoClient(uri);
  try {
      await client.connect();
      const resultado =  await client.db('Beautysoft').collection('citasJhon')
      .updateOne({_id: new ObjectId(id)},
      {
        $set:{
            nombre:nombre,
            apellido:apellido
        }});
      return resultado;
  } catch (e) {
      console.log(e);
  }finally{
      await client.close();
  }
}
//UPDATEMANY
async actualizarMuchos(estado){
   const cliente = new MongoClient(uri);
   try {
     await cliente.connect();
     const resultado = await cliente.db('Beautysoft').collection('citasJhon').updateMany({Id_cita:{$in:[1,2,3]}},
      {
        $set:{estado:estado}
      })
      
 
    return resultado;

   } catch (error) {
    console.log(error);
   }finally{
     await cliente.close()
   }
 }
 //lookups

 async pipeline(servicios, Id_servicio, Id_servicio1, alias) {
  const cliente = new MongoClient(uri);
   try {
    await cliente.connect();
     const  pipeline1 = [
       {
         $lookup: {
           from: servicios, //es desde donde me traigo la informacion
           localField: Id_servicio, //como se llama el id "donde me paro"
           foreignField: Id_servicio1,
           as: alias,
         },
       },
      
     ]
 
     const collection = cliente.db("Beautysoft").collection("citasJhon");
     const resultado = await collection.aggregate(pipeline1).toArray();
     return resultado;
   } catch (error) {
     console.error("Error al ejecutar el pipeline", error);
   } finally {
     await cliente.close();
   }
 }

}




module.exports=citasServices;