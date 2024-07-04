const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const { dbConnection } = require('../database/config');
//let server;
class Server{

    constructor(){
        this.app = express();
        this.app.set('trust proxy', true);
        this.port = process.env.PORT;
        this.authPath = '/coplan-api';
        //Conectar a Base de Datos
        this.conectarDB();
        //Middleware - funcionalidades
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        /* use palabra clave para decir que es un middleware */
        //cors
        this.app.use(cors());
        //Lectura y parseo del codigo
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'))
    }
    routes(){
        this.app.use( `${this.authPath}`, require('../routes/auth'));
    }
    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
        //server.listen( this.port, () => {
        //    console.log('Servidor corriendo en puerto', this.port);
        //});
    }
}
module.exports = Server;