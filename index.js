/* TERMINAL
Inicializar el proyecto de Node.js
npm init -y

Instalar dependencias:
npm i express
npm i mongoose
npm i nodemon
npm i bcrypt


npx nodemon

*/

//require se usa en Node.js para cargar/importar código desde otro módulo.
const express = require('express');//l express es un modulo de node
const app = express();//express() crea la app del modulo
const mongoose = require('mongoose');//express() crea la app del modulo
const rutaCoches=require('./routes/coches.routes')
const rutaUsuarios=require('./routes/usuario.routes')
const rutaVentas=require('./routes/ventas.routes')
const logger = require('./middleware/logger.middleware')

//variables de entorno
require('dotenv').config();

//middleware
const bodyParser= require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/coches", rutaCoches);
app.use("/api/usuario", rutaUsuarios);
app.use("/api/ventas", rutaVentas);

app.use(logger);

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PUERTO=process.env.PORT || 3000
//escuchamos al puerto elegido
app.listen(PUERTO, () => {
    console.log("App en puerto 3000")
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("BBDD BIEN"))
.catch(()=>console.log("BBDD MAL"))