require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const routerApi =require('./routes');
const hbs=require('hbs');

const path =require('path')
const cors = require('cors');//No se debe instanciar. Me permite hacer restrinciones de dominio
const morgan = require('morgan');

const app = express();

//Middlewares
app.use(bodyparser.json()); //para poder trabajar con json
app.use(bodyparser.urlencoded({ extended: true })); //para poder trabajar con formularios codificados en url
app.use(express.json()); //para poder trabajar con json
app.use(cors());
app.use(morgan('tiny'))

hbs.registerPartials(__dirname + '/views', function (err) {});
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static('public'))


const router= express.Router();

const PORT = process.env.PORT || 4000;
routerApi(app);

app.get('/',(req, res)=>{
    res.status(200).send('API de BeautiSoft');
})


app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
})

module.exports=router;