const express = require('express');
const ruta = express.Router();
const ventaController = require("../controller/venta.controller");
const validarVenta = require('../middleware/validarVenta.middleware')
const authMiddleware = require("../middleware/auth.middleware")

//http://localhost:3000/api/ventas/registro
//ruta.post("/registro", ventaController.registro)
ruta.post("/registro",validarVenta.validarVenta, ventaController.registro)

//http://localhost:3000/api/rango/
ruta.get("/rango/:min/:max", ventaController.getVentaFilterByPrecio)

//http://localhost:3000/api/rango/
/**
 * @swagger
 * /api/ventas/rango:
 *  get:
 *      summary: Obtener ventas con busqueda dinamica
 *      parameters:
 *          -   in: query
 *              name: min
 *              schema:
 *                  type: number
 *              description: Precio minimo de busqueda
 *          -   in: query
 *              name: max
 *              schema:
 *                  type: number
 *              description: Precio maximo de busqueda
 *      responses:
 *          200:
 *              description: Devolvemos coche con el filtro deseado
 */
ruta.get("/rango/", ventaController.getVentaFilterByPrecio2)
//http://localhost:3000/api/ventas/:id
ruta.get("/:id", ventaController.getVentaById)
//http://localhost:3000/api/ventas/
//ruta.get("/", ventaController.getVentaByPrecio)
ruta.get("/",authMiddleware.verificarToken, ventaController.getVentaByPrecio)


module.exports = ruta;
