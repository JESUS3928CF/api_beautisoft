require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId} = require('mongodb'); //ObjectId: Para poder trabajar con id


const uri = process.env.URI;

const router = express.Router();

class serviciosServices{
    constructor(){}
//------------------find------//
async find(limit, offset){
  const cliente = new MongoClient(uri);
  try{
      await cliente.connect();
      const resultado = await cliente.db("Beautysoft").collection("serviciosJhon").find({}).skip(Number(offset)).limit(Number(limit)).toArray();
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
        const resultado =  await client.db('Beautysoft').collection('serviciosJhon').findOne({_id: new ObjectId(id)});
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
        const resultado= await cliente.db('Beautysoft').collection('serviciosJhon').insertOne(body);
        return resultado;
    } catch (error) {
        console.log(error);
    }finally{
        await cliente.close()
    }
}
//InserMany
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
      const resultado =  await client.db('Beautysoft').collection('serviciosJhon').deleteOne({_id: new ObjectId(id)});
      return resultado;
  } catch (e) {
      console.log(e);
  }finally{
      await client.close();
  }
}

//UPDATEONE

async updateOne(id,nombre_servicio, valor){
  const client = new MongoClient(uri);
  try {
      await client.connect();
      const resultado =  await client.db('Beautysoft').collection('serviciosJhon')
      .updateOne({_id: new ObjectId(id)},
      {
        $set:{
            nombre_servicio:nombre_servicio,
            valor:valor
        }});
      return resultado;
  } catch (e) {
      console.log(e);
  }finally{
      await client.close();
  }
}
//updateMany
async actualizarMuchos(estado){
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Beautysoft').collection('serviciosJhon').updateMany({},
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
}


module.exports=serviciosServices;