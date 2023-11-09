//Rutas para usuario
const express = require('express');
const router = express.Router();
const PaginaController = require('../controllers/paginaController')

//api/paginas
router.post('/',PaginaController.crearPagina);
router.put('/:id',PaginaController.actualizarPagina);
router.get('/:id',PaginaController.obtenerPagina);
router.get('/',PaginaController.obtenerPaginas);
module.exports = router;

