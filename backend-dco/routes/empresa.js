//ruta para empresas
const express = require('express')
const router = express.Router()
const empresaController= require('../controllers/empresaController')

//api empresa registro
router.post('/registro/',empresaController.agregar)
router.get('/registro/:id',empresaController.obtener)
router.post('/login/',empresaController.login)
router.get('/listaEmpresas',empresaController.listar)
router.get('/empresa/:id',empresaController.obtenerEmpresa)
router.put('/bloquearEmpresa',empresaController.bloquearEmpresa)
router.delete('/eliminarEmpresa/:id/:idAdmin',empresaController.eliminarEmpresa)
//router.delete('/registro/:id',empresaController.borrar)
//router.put('/registro/',empresaController.actualizar)

//actualizarInfo
//router.post(bodega.single('file'),'/actualizarInfo',empresaController.actualizarInfo )

router.post('/actualizarInfo',empresaController.actualizarInfo)




router.get('/rellenarInfo/:id',empresaController.rellenarInfo)

router.post('/actualizarInfo', empresaController.actualizarInfo);
router.get('/logo/:id',empresaController.logo)
router.post('/aggCategoria',empresaController.aggCategoria)
router.get('/getCategorias/:id',empresaController.getCategorias)
router.put('/updCategorias',empresaController.updCategorias)
router.delete('/delCategorias',empresaController.delCategorias)
router.get('/seguridad/:id',empresaController.seguridad)
router.get('/getProductos/:id',empresaController.getProductos)
router.get('/getCantProductos/:id',empresaController.CantProductos)
router.put('/actualizarProducto',empresaController.actualizarProducto)
router.delete('/eliminarProducto',empresaController.eliminarProducto)
router.put('/desbloquearEmpresa',empresaController.desbloquearEmpresa)
router.post('/venta',empresaController.venta)
router.get('/historial/:id',empresaController.historial)

//para graficos
router.get('/cantVendidosXprod/:id',empresaController.cantVendidosXprod)
router.get('/prodVendidosXcat/:id',empresaController.prodVendidosXcat)
router.get('/gananciasXcat/:id',empresaController.gananciasXcat)
router.get('/top10/:id',empresaController.top10)

module.exports=router
