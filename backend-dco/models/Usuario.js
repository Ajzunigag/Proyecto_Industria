const moongose = require('mongoose');

const UsuarioSchema = moongose.Schema({
    nombre : {
        type:String,
        require:true
    },
    correo : {
        type:String,
        require:true
    },
    contrasenia : {
        type:String,
        require:true
    },
    tipoUsuario : {
        type:String,
        require:true
    },
    terminos : {
        type:Boolean,
        require:true
    },
    fechaCreacion : {
        type:Date,
        default:Date.now()
    }
});

module.exports = moongose.model('Usuario',UsuarioSchema);