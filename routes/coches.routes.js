const express = require('express');
const ruta = express.Router();
const cocheController = require("../controller/coche.controller");
const logger = require("../middleware/logger.middleware")


//ruta.get("/todos", todos);
//http://localhost:3000/api/coches/carga-inicial
ruta.get("/carga-inicial", cocheController.cargaInicial);
//http://localhost:3000/api/coches/buscar-todos
//ruta.get("/buscar-todos", cocheController.findAll);

//para conectar: http://localhost:3000/api-docs
/**
 * @swagger
 * /api/coches:
 *  get:
 *      summary: Obtenemos todos los coches
 *      responses:
 *          200:
 *              description: Lista de coches
 */

ruta.get("/",logger, cocheController.findAll)

//http://localhost:3000/api/coches/buscar-coche-id/:id
/**
 * @swagger
 * /api/coches/buscar-coche-id/{id}:
 *  get:
 *      summary: Obtener un coche por id
 *      parameters:
 *          -   in: path
 *              name: id
 *              description: ID del coche
 *      responses:
 *          200:
 *              description: Coche encontrado
 *          404:
 *              description: Coche no encontrado o no existe
 */
ruta.get("/buscar-coche-id/:id", cocheController.findById);
//http://localhost:3000/api/coches/buscar-coche-anio/:anio
ruta.get("/buscar-coche-anio/:anio", cocheController.findByAnioGreaterThan);
//http://localhost:3000/api/coches/buscar-coche-anio/:anio
ruta.get("/buscar-coche-marca/:marca", cocheController.findByMarca);
//http://localhost:3000/api/coches/insertar-coche
ruta.post("/insertar-coche", cocheController.insertOne);
//http://localhost:3000/api/coches/create-coche
ruta.post("/create-coche", cocheController.createCoche);
//http://localhost:3000/api/coches/update/:id
ruta.put("/update/:id", cocheController.updateById);
//http://localhost:3000/api/coches/eliminar/:id
ruta.delete("/eliminar/:id", cocheController.deleteById);


module.exports = ruta;
