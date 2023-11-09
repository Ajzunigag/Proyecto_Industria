//Rutas para usuario
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')

//api/usuarios
router.post('/',usuarioController.crearUsuario);
router.get('/',usuarioController.obtenerUsuarios);
router.put('/actualizar/:idAdmin',usuarioController.actualizarUsuario);
router.get('/:id',usuarioController.obtenerUsuario);
router.delete('/:id',usuarioController.eliminarUsuario);
router.post('/login/',usuarioController.loginUsuario);
module.exports = router;

