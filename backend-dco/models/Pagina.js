const moongose = require('mongoose');

const PaginaSchema = moongose.Schema({
    html : {
        type:String,
        require:true
    },
    css : {
        type:String,
        require:true
    },
    javascript : {
        type:String,
        require:false
    },
    empresaId : {
        type:String,
        require:false
    },
    img1 : {
        type:String,
        require:false
    },
    img2 : {
        type:String,
        require:false
    },
    img3 : {
        type:String,
        require:false
    },
    fechaCreacion : {
        type:Date,
        default:Date.now()
    }
});

module.exports = moongose.model('Pagina',PaginaSchema);