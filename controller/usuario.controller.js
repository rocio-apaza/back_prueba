//const coches = require("../bbdd/coches")
const Usuario = require("../model/usuario.model");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

//controller tiene todos los metodos
    //$eq = equals
    //$ne = no equals
    //$gt = greater than
    //$gte = greater than or equals
    //$lt = less than
    //$lte = less than or equals
    //$in = includes
    //$nin = excludes

class UsuarioController{

    async logIn(req, res) {


        const user = await Usuario.findOne(
            { username: req.body.username }).select("+password");

        const isTruePassword = user ? await bcrypt.compare(req.body.password, user.password) : false;

        if (!user || !isTruePassword) {
            return res.status(404).send("Credenciales incorrectas");
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                rol: user.rol
            },
            "token",
            {
                expiresIn: "2h"
            })

        return res.status(200).json({ "mensaje": "Inicio de sesión correcto", "token": token });
        if (!result) {
            return res.status(404).send("credenciales incorrectas");
        }
        return res.status(200).send(result)
    }


    async getUsers(req, res){
        const result = await Usuario.find();
        return res.status(200).send(result)
    }
    async getUserById(req, res){
        const result = await Usuario.findById(req.params.id);
        return res.status(200).send(result)
    }
    /*
    async logIn(req, res){
        const result = await Usuario.findOne({username:req.body.username, password:req.body.password});
        if(!result){
            return res.status(404).send("credenciales incorrectas")
        }
        return res.status(200).send(result)
    }

    async logInWithEncryptedPassword(req, res){
        const user = await Usuario.findOne({username:req.body.username}).select("+password");//select ese hace que lo devuelva
        
        const isTruePasword = user ? await bcrypt.compare(req.body.password, user.password):false

        if(!user || !isTruePasword){
            return res.status(404).send("credenciales incorrectas")
        }
        return res.status(200).send("login correctp")
    }
*/
    async singUp(req, res) {
        try {
            const usuario = new Usuario({
                username: req.body.username,
                password: req.body.password,
                nombre: req.body.nombre,
                email: req.body.email,
                rol: req.body.rol
            });

            await usuario.save();
            return res.status(201).send("User insertadoooo");

        } catch (error) {
            console.error("Error al insertar en la bbdd:", error);
            return res.status(500).send("ERROR INTERNOOOOOOO");
        }
    }



    async singUpWithEncryptedPassword(req, res) {
        try {
            const passwordEncriptado=await bcrypt.hash(req.body.password, 10)
            console.log(passwordEncriptado);
            const usuario = new Usuario({
                username: req.body.username,
                password: passwordEncriptado,
                nombre: req.body.nombre,
                email: req.body.email,
                rol: req.body.rol
            });

            await usuario.save();
            return res.status(201).send("User insertadoooo");

        } catch (error) {
            console.error("Error al insertar en la bbdd:", error);
            return res.status(500).send("ERROR INTERNOOOOOOO");
        }
    }

    async deleteUser(req, res){
        const result = await Usuario.findByIdAndDelete(req.params.id);
        if(!result){
            return res.status(404).send("no se encontro")
        }
        return res.status(200).send("Usuario eliminadooo")
    }

}


//EXPORTAMOS ===========================================================
module.exports=new UsuarioController();