const express = require('express');
const ruta = express.Router();
const usuarioController = require("../controller/usuario.controller");
const validarUsuario = require('../middleware/validarVenta.middleware');
const authMiddleware = require("../middleware/auth.middleware")

//http://localhost:3000/api/usuario/getUsers
ruta.get("/", usuarioController.getUsers);
//http://localhost:3000/api/usuario/
ruta.get("/:id", usuarioController.getUserById);
//http://localhost:3000/api/usuario/login
//ruta.post("/login", usuarioController.logIn);
//ruta.post("/loginEn", usuarioController.logInWithEncryptedPassword);
ruta.post("/login", validarUsuario.validarUsuario, usuarioController.logIn)

//http://localhost:3000/api/usuario/crear-usuario
//ruta.post("/singup", usuarioController.singUp);
//ruta.post("/singupEn", usuarioController.singUpWithEncryptedPassword);
ruta.post("/signup", usuarioController.singUp);
ruta.post("/signupencriptado", usuarioController.singUpWithEncryptedPassword);
//http://localhost:3000/api/usuario/crear-usuario
//ruta.delete("/delete/:id", usuarioController.deleteUser);
ruta.delete("/delete/:id",authMiddleware.permitirRoles("DIRECTOR", "ADMON"), usuarioController.deleteUser)


module.exports = ruta;
