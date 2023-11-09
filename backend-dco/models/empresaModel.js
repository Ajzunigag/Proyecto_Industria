const mongoose = require('mongoose')

const empresa = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
    },
    logo: {
        type: String
    },
    contrasena: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    bancoMultimedia: {
        type: []
    },
    estilo1: {
        type: String,
        required: false
    },
    estilo2: {
        type: String,
        required: false
    },
    estilo3: {
        type: String,
        required: false
    },
    productos: {
        type: []
    },
    categorias: {
        type: []
    },
    activo:{
        type: Boolean
    }    
})

module.exports = mongoose.model('empresa', empresa)