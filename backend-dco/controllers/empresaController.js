const Empresa = require('../models/empresaModel');
const Producto = require('../models/Producto');
const Plan = require('../models/Plan');
const Venta = require('../models/ventaModel');
const Bitacora = require('../models/bitacoraModel')


var log = {
    archivoViejo: null,
    archivoNuevo: null,
    descripcion: '',
    fecha: '',
    admin: null
}


exports.agregar = async (req, res) => {
    try {
        let empresa;

        empresa = new Empresa(req.body);
        await empresa.save();
        console.log(empresa)

        //bitacora
        log.archivoNuevo = empresa
        log.descripcion = 'Creación de una nueva empresa'
        log.fecha = Date.now()
        let bitacora = new Bitacora(log)
        await bitacora.save()

        res.send(empresa);
    } catch (e) {

        res.send(e)
    }
}

exports.listar = async (req, res) => {
    try {
        let empresas = await Empresa.find();
        if (empresas.length > 0) {
            let planes = await Plan.find();
            empresas.forEach(empresa => {
                planes.forEach(plan => {
                    if (empresa.plan == plan._id) {
                        empresa.plan = plan.nombre
                    }
                });
            });
            res.send({ mensaje: "empresas encontrados", listaEmpresas: empresas, acceso: 1 });
        } else {
            res.send(false);
        }
        res.end()
    } catch (error) {
        console.log(error);
        res.send('Hubo un error');
    }
}

exports.obtenerEmpresa = async (req, res) => {
    try {
        let empresa = await Empresa.findById(req.params.id);
        if (empresa) {
            res.send({ mensaje: "empresa encontrada", empresa: empresa, acceso: 1 });
        } else {
            res.send(false);
        }
        res.end()
    } catch (error) {
        console.log(error);
        res.send('Hubo un error');
    }
}
//para esta bitacora se ocupa la info del admin que bloquea la empresa
exports.bloquearEmpresa = async (req, res) => {
    const { id, idAdmin } = req.body;
    try {

        let empresa = await Empresa.findByIdAndUpdate({ _id: id }, {
            'activo': false
        }, { new: true })
        if (empresa) {

            //bitacora
            log.admin = idAdmin
            log.fecha = Date.now()
            log.descripcion = "Bloqueo de la empresa con id: " + id
            let bitacora = new Bitacora(log)
            bitacora.save()

            res.send({ mensaje: "empresa bloqueada", empresa: empresa, acceso: 1 });

        } else {
            res.send(false);
        }
    } catch (error) {
        console.log(error);
        res.send('Hubo un error');
    }
}
//para esta bitacora se ocupa la info del admin que desbloquea la empresa
exports.desbloquearEmpresa = async (req, res) => {
    const { id, idAdmin } = req.body;
    try {
        let empresa = await Empresa.findByIdAndUpdate({ _id: id }, {
            'activo': true
        }, { new: true })
        if (empresa) {

            //bitacora
            log.admin = idAdmin
            log.fecha = Date.now()
            log.descripcion = "Desbloqueo de la empresa con id: " + id
            let bitacora = new Bitacora(log)
            bitacora.save()

            res.send({ mensaje: "empresa desbloqueada", empresa: empresa, acceso: 1 });
        } else {
            res.send(false);
        }
    } catch (error) {
        console.log(error);
        res.send(null);
    }
}
//para esta bitacora se ocupa la info del admin que elimina la empresa
exports.eliminarEmpresa = async (req, res) => {
    try {
        const {id, idAdmin}=req.params
        console.log(id,idAdmin)
        let empresa = await Empresa.findByIdAndRemove(id);
        if (empresa) {

            //bitacora
            log.archivoViejo=JSON.stringify(empresa)
            log.fecha=Date.now()
            log.descripcion="Eliminación de la empresa con id: "+id
            let bitacora=new Bitacora(log)
            bitacora.save()

            res.send({ mensaje: "empresa eliminada", empresa: empresa, acceso: 1 });
        } else {
            res.send(false);
        }
        res.end()
    } catch (error) {
        res.send(null)
        res.end()
    }
}

exports.obtener = async (req, res) => {
    try {
        let empresa = await Empresa.find({ 'correo': req.params.id }, { "correo": 1 })

        res.send(empresa)
    } catch (e) {

        res.send(e)
    }
}

exports.login = async (req, res) => {
    const { correo, contrasena } = req.body
    try {
        let empresa = await Empresa.find({ "correo": correo, "contrasena": contrasena }, { "correo": 1, "contrasena": 1, "activo": 1 },)
        if (empresa[0]) {

            log.descripcion = "inicio de sesión exitoso de la empresa con correo: " + correo
            log.fecha = Date.now()
            let bitacora = new Bitacora(log)
            bitacora.save()

            res.send(empresa)
        } else {

            log.descripcion = "inicio de sesión fallido de la empresa con correo: " + correo
            log.fecha = Date.now()
            let bitacora = new Bitacora(log)
            bitacora.save()

            res.send(false)
        }
        //res.send(empresa)
    } catch (e) {

        res.send(e)
    }
    res.end()
}
exports.seguridad = async (req, res) => {
    const idEmpresa = req.params.id
    try {
        let empresa = await Empresa.find({ "_id": idEmpresa })
        res.send(true)
        res.end()
    } catch (e) {
        res.send(null)
        res.end()
    }
}

exports.actualizarInfo = async (req, res) => {
    const { body } = req
    let empresa

    try {
        empresa = await Empresa.findById({ _id: body.idEmpresa })

        //bitacora
        log.archivoViejo = empresa

        empresa = await Empresa.findByIdAndUpdate({ _id: body.idEmpresa }, {
            'nombre': body.nombre,
            'correo': body.correo,
            'descripcion': body.descripcion,
            'contrasena': body.contrasena,
            'logo': body.logo
        }, { new: true })

        //bitacora
        log.archivoNuevo = empresa
        log.descripcion = 'Actualización de datos de la empresa'
        log.fecha = Date.now()
        let bitacora = new Bitacora(log)
        bitacora.save

        res.send(empresa)
    } catch (e) {
        res.send(e)
    }
    res.end()
}

exports.rellenarInfo = async (req, res) => {
    try {
        const id = req.params.id
        const empresa = await Empresa.findById({ '_id': id })
        res.send(empresa)
        res.end()
    } catch (e) {
        res.send(e)
        res.end()
    }
}
exports.logo = async (req, res) => {
    try {
        const id = req.params.id

        let logo = await Empresa.find({ "_id": id }, { "logo": 1 })
        res.send(logo)
        res.end()
    } catch (e) {
        res.send(e)
        res.end()
    }
}

exports.aggCategoria = async (req, res) => {
    try {
        const { idEmpresa, categoria } = req.body
        let empresa = await Empresa.find({ '_id': idEmpresa }, { "categorias": 1 })

        //bitacora
        log.archivoViejo = JSON.stringify(empresa)
        log.descripcion = 'nueva categoría agregada en empresa con id: ' + idEmpresa
        log.fecha = Date.now()

        let categorias = empresa[0].categorias
        categorias.push(categoria)

        empresa = await Empresa.findByIdAndUpdate({ _id: idEmpresa }, { 'categorias': categorias }, { new: true })

        log.archivoNuevo = empresa
        let bitacora = new Bitacora(log)
        bitacora.save()

        res.send(empresa)
        res.end()
    } catch (e) {
        res.send(e)
        res.end()
    }
}

exports.getCategorias = async (req, res) => {
    try {
        const idEmpresa = req.params.id
        let empresa = await Empresa.find({ '_id': idEmpresa }, { "categorias": 1 })
        res.send(empresa)
        res.end()
    } catch (e) {
        res.send(e)
        res.end()
    }
}
exports.updCategorias = async (req, res) => {
    try {
        const { categoria, idEmpresa, seleccionado } = req.body
        let empresa = await Empresa.find({ '_id': idEmpresa }, { "categorias": 1 })

        //bitacora
        log.archivoViejo = JSON.stringify(empresa)
        log.descripcion = "actualizacion de categoria en la empresa con id: " + idEmpresa
        log.fecha = Date.now()

        let categorias = empresa[0].categorias
        let indice = categorias.indexOf(seleccionado)
        categorias.splice(indice, 1)
        categorias.push(categoria)

        empresa = await Empresa.findByIdAndUpdate({ _id: idEmpresa }, { 'categorias': categorias }, { new: true })

        log.archivoNuevo = empresa
        let bitacora = new Bitacora(log)
        bitacora.save()

        res.send(empresa)
        res.end()
    } catch (e) {
        res.send(e)
        res.end()
    }
}



exports.delCategorias = async (req, res) => {
    try {
        const { idEmpresa, categoria } = req.query

        let empresa = await Empresa.find({ '_id': idEmpresa }, { "categorias": 1 })

        //bitacora
        log.archivoViejo = JSON.stringify(empresa)
        log.descripcion = "eliminación de categoria en la empresa con id: " + idEmpresa
        log.fecha = Date.now()

        let categorias = empresa[0].categorias
        let indice = categorias.indexOf(categoria)
        categorias.splice(indice, 1)

        empresa = await Empresa.findByIdAndUpdate({ _id: idEmpresa }, { 'categorias': categorias }, { new: true })

        log.archivoNuevo = empresa
        let bitacora = new Bitacora(log)
        bitacora.save()

        res.send(empresa)
        res.end()
    } catch (e) {
        res.send(e)
        res.end()
    }
}

exports.getProductos = async (req, res) => {
    try {
        console.log(req.params.id)
        const productos = await Producto.find({ 'empresa': req.params.id })

        res.send(productos)
        res.end()
    } catch (e) {
        res.send(e)
        res.end()
    }
}
exports.CantProductos = async (req, res) => {
    try {
        console.log(req.params.id)
        const productos = await Producto.find({ 'empresa': req.params.id })
        res.send({ "cantidad": productos.length })
        res.end()
    } catch (e) {
        res.send(e)
        res.end()
    }
}
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, precio, categoria, descripcion, img, idProducto } = req.body

        //bitacora
        let viejo = await Producto.findById({ _id: idProducto })
        log.archivoViejo = JSON.stringify(viejo)
        log.descripcion = "actualización de producto"
        log.fecha = Date.now()

        let producto = await Producto.findByIdAndUpdate({ _id: idProducto }, {
            'nombre': nombre,
            'precio': precio,
            'categoria': categoria,
            'descripcion': descripcion,
            'img': img
        })

        log.archivoNuevo = producto
        let bitacora = new Bitacora(log)
        bitacora.save()

        res.send(producto)
        res.end()
    } catch (e) {
        res.send(e)
        res.end()
    }
}
exports.eliminarProducto = async (req, res) => {
    try {
        const { idProducto, idEmpresa } = req.query
        console.log(idProducto)


        let empresa = await Empresa.find({ '_id': idEmpresa }, { "productos": 1 })
        let productos = empresa[0].productos
        let indice = productos.indexOf(idProducto)

        productos.splice(indice, 1)

        empresa = await Empresa.findByIdAndUpdate({ _id: idEmpresa }, { 'productos': productos }, { new: true })

        //bitacora
        let viejo = await Producto.findById({ '_id': idProducto })
        log.archivoViejo = JSON.stringify(viejo)
        log.fecha = Date.now()
        log.descripcion = 'eliminación de producto'
        let bitacora = new Bitacora(log)
        bitacora.save()

        let producto = await Producto.remove({ '_id': idProducto })

        res.send(producto)
        res.end()
    } catch (e) {
        res.send(e)
        res - end()
    }
}
exports.venta = async (req, res) => {
    try {
        const venta = {
            idProducto: req.body.idProducto,
            idComprador: req.body.idComprador,
            idEmpresa: '',
            nombre: req.body.nombre,
            precio: req.body.precio,
            fecha: Date.now(),
        }
        const producto = await Producto.findById({ '_id': req.body.idProducto }, { 'empresa': 1 })
        venta.idEmpresa = producto.empresa

        const guardar = new Venta(venta)
        guardar.save()
        res.send(guardar)
        res.end()
    } catch (e) {
        res.send(e)
        res.end()
    }
}
exports.historial = async (req, res) => {
    try {
        let idEmpresa = req.params.id
        const historial = await Venta.find({ 'idEmpresa': idEmpresa })
        console.log(historial)
        res.send(historial)
    } catch (e) {
        res.send(e)
        res.end()
    }
}

//datos para graficos de estadisticas

//cantidad de productos vendidos por cada producto
exports.cantVendidosXprod = async (req, res) => {
    try {
        let idEmpresa = req.params.id
        const cantVendidosXprod = await Venta.find({ 'idEmpresa': idEmpresa })
        console.log(cantVendidosXprod)
        res.send(cantVendidosXprod)
    } catch (e) {
        res.send(e)
        res.end()
    }
}
//cantidad de productos vendidos por categoria
exports.prodVendidosXcat = async (req, res) => {
    try {
        let idEmpresa = req.params.id
        const prodVendidosXcat = await Venta.find({ 'idEmpresa': idEmpresa })
        console.log(prodVendidosXcat)
        res.send(prodVendidosXcat)
    } catch (e) {
        res.send(e)
        res.end()
    }
}
//ganancias por categoria
exports.gananciasXcat = async (req, res) => {
    try {
        let idEmpresa = req.params.id
        const gananciasXcat = await Venta.find({ 'idEmpresa': idEmpresa })
        console.log(gananciasXcat)
        res.send(gananciasXcat)
    } catch (e) {
        res.send(e)
        res.end()
    }
}
//top 10 mas vendidos
exports.top10 = async (req, res) => {
    try {
        let idEmpresa = req.params.id
        const top10 = await Venta.find({ 'idEmpresa': idEmpresa }, { 'Nombre': 1, '_id': 0 })
        top10.sort()
        res.send(top10)
    } catch (e) {
        res.send(e)
        res.end()
    }
}