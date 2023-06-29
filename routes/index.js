const express = require('express');

const routerCitas=require('./routesCitas');
const routerServicios=require('./routesServicios');
const routerEstilistas=require('./routesEstilistas');


function routerApi(app){
    // const router=express.Router();
    
    // app.use('/beautysoft/v1', router);
    app.use('/citasJhon', routerCitas),
    app.use('/serviciosJhon',routerServicios);
    app.use('/estilistaJhon',routerEstilistas);
       
}

module.exports =routerApi;
