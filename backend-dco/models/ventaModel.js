const mongoose = require('mongoose')

const venta = mongoose.Schema({
    idProducto: {
        type: String
    },
    idComprador: {
        type: String
    },
    idEmpresa: {
        type: String
    },
    nombre: {
        type: String
    },
    precio: {
        type: Number
    },
    fecha: {
        type: Date
    }
})

module.exports = mongoose.model('venta', venta)