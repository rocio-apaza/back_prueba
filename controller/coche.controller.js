const coches = require("../bbdd/coches")
const Coche = require("../model/coche.model")
//const { param } = require("../routes/coches.routes")

//controller tiene todos los metodos
    //$eq = equals
    //$ne = no equals
    //$gt = greater than
    //$gte = greater than or equals
    //$lt = less than
    //$lte = less than or equals
    //$in = includes
    //$nin = excludes

//FINDS ===========================================================
const cargaInicial=async(req, res)=>{
    await Coche.insertMany(coches);
    return res.status(201).send("Carga completa!")
}

//siempre hay ue manejar la promesa con un await
const findAll=async(req,res)=>{
    const result = await Coche.find();
    res.status(200).send(result);
    res.status(500).send("TODO MAL");
}

const findById=async(req,res)=>{
    //El id lleva _ por convencion del mongo :P
    const result = await Coche.find({_id:req.params.id});//se puede pasar cualquier parametro
    return res.status(200).send(result);
}

const findByAnioGreaterThan=async(req,res)=>{
    const anio = req.params.anio;
    const result = await Coche.find({anio:{$gt: anio}});
    if (result.length==0){
        return res.status(404).send({message:"NOOOOOOOOOOOOOOOOOOOOOO"});
    }
    return res.status(200).send(result);
}

const findByMarca=async(req,res)=>{
    const marca = req.params.marca;
    const result = await Coche.find({marca});
    return res.status(200).send(result);
}

//INSERT ===========================================================
const insertOne=async(req,res)=>{
    try {
    const coche = req.body;//BODY pasa todooo
    const cocheNuevo = new Coche(coche);
    const result = await cocheNuevo.save();
    return res.status(201).send({message:"Coche insertado bien"});
    }
    catch(error){
        console.error("Error al insertar Coche");
        res.status(404).send({message:"Error al insertar"});
    }
}

const createCoche=async(req,res)=>{
    try {
    const {marca,modelo,anio,extras} = req.body;//BODY pasa todooo
    const result = await Coche.create({marca,modelo,anio,extras});
    return res.status(201).send({message:"Coche creado bien"});
    }
    catch(error){
        console.error("Error al crear Coche");
        res.status(404).send({message:"Error al crear"});
    }    
}

//UPDATE ===========================================================
const updateById=async(req,res)=>{
    //true para que devuelva los datos nuevos, false devuelve los antiguos
    //runValidators valida segun el modelo
    try {
    const result = await Coche.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators: true});
    return res.status(200).send({result, message:"Coche actualizado bien"});
    }
    catch(error){
        console.error("Error al actualizar Coche");
        res.status(404).send({message:"Error al actualizar"});
    }    
}

//DELETE ===========================================================
const deleteById=async(req,res)=>{
    try {
    const result = await Coche.findByIdAndDelete(req.params.id);
    return res.status(200).send({message:"Coche eliminado bien"});
    }
    catch(error){
        console.error("Error al eliminar Coche");
        res.status(404).send({message:"Error al eliminar"});
    }    
}



//EXPORTAMOS ===========================================================
module.exports={
    cargaInicial,
    findAll,
    findById,
    findByAnioGreaterThan,
    findByMarca,
    insertOne,
    createCoche,
    updateById,
    deleteById
}