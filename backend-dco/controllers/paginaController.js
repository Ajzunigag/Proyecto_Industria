const Pagina = require("../models/Pagina");

exports.crearPagina = async (req,res)=>{
    try{
        let pagina;

        //Creamos nuestro usuario
        pagina = new Pagina(req.body);

        await pagina.save();
        res.send(pagina);

    } catch(error){
        console.log(error);
        res.send(error)
        res.end();
    }
}


exports.actualizarPagina = async(req,res)=>{
    try{

        const {html,css,javascript,empresaId} = req.body
        let pagina = await Pagina.findById(req.params.id);

        if(!pagina){
            res.status(404).json({msg:'No existe el producto'})
        }

        pagina.html = html;
        pagina.css = css;
        pagina.javascript = javascript;
        pagina.empresaId = empresaId;

        pagina = await Pagina.findOneAndUpdate({_id:req.params.id},pagina,{new:true} );
        res.json(pagina);
        
    }catch(error){
        console.log(error);
        req.send(error);
        res.end();
    }
}

exports.obtenerPagina = async(req,res)=>{
    try {
        let pagina = await Pagina.findOne({empresaId: req.params.id});
        
        if (!pagina) {
            res.status(404).json({ msg: 'No existe el producto' })
            res.end()
        }else{
            res.json(pagina);
            res.end()
        }

    } catch (error) {
        console.log(error);
        res.send(error)
        res.end()
    }
}

exports.obtenerPaginas = async (req, res) => {
    try {

        const paginas = await Pagina.find();
        res.json(paginas)

    } catch (error) {
        console.log(error);
        res.send(error)
        res.end()
    }
}


