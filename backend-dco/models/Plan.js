const mongoose = require('mongoose');

const PlanSchema = mongoose.Schema({
    nombre : {
        type:String,
        require:true
    },
    descripcion : {
        type:String,
        require:true
    },
    maxArticulos : {
        type:Number,
        require:true
    },
    estadisticas : {
        type:Number,
        require:true
    }
});

module.exports = mongoose.model('Plan', PlanSchema);