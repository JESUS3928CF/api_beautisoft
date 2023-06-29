require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId} = require('mongodb'); //ObjectId: Para poder trabajar con id



const uri = process.env.URI;

const router = express.Router();

class estilistaServices{
    constructor(){}
//------------------find------//
async find(limit, offset){
  const cliente = new MongoClient(uri);
  try{
      await cliente.connect();
      const resultado = await cliente.db("Beautysoft").collection("estilistaJhon").find({}).skip(Number(offset)).limit(Number(limit)).toArray();;
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
        const resultado =  await client.db('Beautysoft').collection('estilistaJhon').findOne({_id: new ObjectId(id)});
        return resultado;
    } catch (e) {
        console.log(e);
    }finally{
        await client.close();
    }
}

//InsertOne
async insertOne(id_estilista,nombre, apellido, email){
    const cliente =new MongoClient(uri);
    try {
        await cliente.connect()
        const resultado= await cliente.db('Beautysoft').collection('estilistaJhon').insertOne(  {
            "Id_estilista":id_estilista,
            "nombre":nombre, 
            "apellido":apellido, 
            "email":email,
            "estado":true
        });;
        return resultado;
    } catch (error) {
        console.log(error);
    }finally{
        await cliente.close()
    }
}

//InsertMany

// async insertMany(id_estilista,nombre, apellido, email){
//   const cliente =new MongoClient(uri);
//   try {
//       await cliente.connect()
//       const resultado= await cliente.db('Beautysoft').collection('citasJhon').insertMany(  {
//         "Id_estilista":id_estilista,
//         "nombre":nombre, 
//         "apellido":apellido, 
//         "email":email,
//         "estado":true
//     });
//       return resultado;
//   } catch (error) {
//       console.log(error);
//   }finally{
//       await cliente.close()
//   }

// }

//DeletOne
async deleteOne(id){
  const client = new MongoClient(uri);
  try {
      await client.connect();
      const resultado =  await client.db('Beautysoft').collection('estilistaJhon').deleteOne({_id: new ObjectId(id)});
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
      const resultado =  await client.db('Beautysoft').collection('estilistaJhon')
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

//UpdateMany

async actualizarMuchos(estado){
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Beautysoft').collection('estilistaJhon').updateMany({},
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

module.exports=estilistaServices;