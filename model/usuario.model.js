const mongoose = require('mongoose');

const usuarioSchema=new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type:String,
        required: true,
        select:false//con select el campo no se devuelve consultas
    },
    nombre: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

        match: [/^\S+@\S+\.\S+$/, "El email no es valido"]
    },
    enable: {
        type:Boolean,
        default: true,
        select:false
    },
    rol: {
        type:String,
        required: true,
        trim: true,
        //enum para no tener mas opcion que el modelo
        enum: ["ADMON","CLIENTE", "DIRECTOR"]
    }
},
{
    timestamps: true,
    versionKey: false
}
)

const Usuario = mongoose.model('usuario',usuarioSchema);
module.exports=Usuario;