const mongoose = require('mongoose')

const bitacora = mongoose.Schema({
    archivoViejo: {
        type: String,
        required: false
    },
    archivoNuevo: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    admin: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('bitacora', bitacora)