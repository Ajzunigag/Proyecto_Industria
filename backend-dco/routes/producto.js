//Rutas para producto
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController')


//api/producto
router.post('/',productoController.subirProducto);
router.get('/:id',productoController.obtenerProducto);
router.get('/',productoController.obtenerProductos);
module.exports = router;

