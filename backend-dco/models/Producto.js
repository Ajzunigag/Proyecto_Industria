const moongose = require('mongoose');

const ProductoSchema = moongose.Schema({
    nombre : {
        type:String,
        require:true
    },
    precio : {
        type:Number,
        require:true
    },
    img : {
        type:String,
        require:true
    },
    descripcion : {
        type:String,
        require:true
    },
    empresa:{
        type:String,
        require:true
    },
    categoria:{
        type:String,
        require:true
    },
    fechaCreacion : {
        type:Date,
        default:Date.now()
    }
})

module.exports = moongose.model('Producto',ProductoSchema);