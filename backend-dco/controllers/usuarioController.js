const Usuario = require("../models/Usuario");
const Bitacora = require('../models/bitacoraModel')


var log = {
    archivoViejo: null,
    archivoNuevo: '',
    descripcion: '',
    fecha: '',
    admin: null
}

exports.crearUsuario = async (req, res) => {
    try {
        let usuario;

        //Creamos nuestro usuario
        usuario = new Usuario(req.body);

        await usuario.save();

        //bitacora
        log.archivoNuevo = usuario
        log.descripcion = "creacion de nuevo usuario"
        log.fecha = Date.now()
        let bitacora = new Bitacora(log)
        bitacora.save()

        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.send('Hubo un error')
    }
}

exports.obtenerUsuarios = async (req, res) => {
    try {

        let usuarios = await Usuario.find();
        if (usuarios[0]) {
            res.send({ mensaje: "usuarios encontrados", listaUsuarios: usuarios, acceso: 1 });
        } else {
            res.send({ mensaje: "no se encontraron usuarios", acceso: 0 });
        }

    } catch (error) {
        console.log(error);
        req.send('Hubo un error');
    }
}
//para esta bitacora se ocupa la info del administrador que hace el cambio
exports.actualizarUsuario = async (req, res) => {
    try {

        const { id, nombre, correo, contrasenia } = req.body
        let usuario = await Usuario.findById(id);

        //bitacora
        log.fecha = Date.now()
        log.descripcion = "Eliminación del usuario con id: " + id
        log.archivoViejo = usuario
        log.admin = req.params.idAdmin


        if (usuario) {
            usuario = await Usuario.findOneAndUpdate({ _id: id }, {
                'nombre': nombre,
                'correo': correo,
                'contrasenia': contrasenia
            }, { new: true });

            log.archivoNuevo=usuario
            let bitacora = new Bitacora(log)
            bitacora.save()

            res.send({ mensaje: "usuario actualizado", acceso: 1 });
        } else {
            res.send({ mensaje: "no se encontro el usuario", acceso: 0 });
        }

    } catch (error) {
        console.log(error);
        req.send('Hubo un error');
    }
}

exports.obtenerUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findById(req.params.id);
        if (usuario) {
            res.send({ mensaje: "usuario encontrado", usuario: usuario, acceso: 1 });
        } else {
            res.send({ mensaje: "no se encontraro el usuario", acceso: 0 });
        }

    } catch (error) {
        console.log(error);
        req.send('Hubo un error');
    }
}
//para esta bitacora se ocupa la info del administrador que hace el cambio
exports.eliminarUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            res.send({ msg: 'No existe el usuario' })
        }

        await Usuario.findOneAndRemove({ _id: req.params.id });

        //bitacora
        log.fecha = Date.now()
        log.descripcion = "Eliminación del usuario con id: " + id
        log.archivoViejo = Usuario
        log.admin = req.params.idAdmin
        let bitacora = new Bitacora(log)
        bitacora.save()

        res.send({ msg: 'Usuario eliminado con exito' });

    } catch (error) {
        console.log(error);
        req.send('Hubo un error');
    }
}

exports.loginUsuario = async (req, res) => {
    const { email, contrasenia } = req.body
    console.log(req.body);
    console.log(email, contrasenia)
    try {
        let usuario = await Usuario.find({ "correo": email, "contrasenia": contrasenia }, { "correo": 1, "contrasenia": 1 })

        if (usuario[0]) {
            //bitacora
            log.descripcion = "inicio de sesion exitoso del usuario: " + usuario + "con mail: " + email
            log.fecha = Date.now()
            let bitacora = new Bitacora(log)
            bitacora.save()

            res.send(usuario)
        } else {

            log.descripcion = "inicio de sesion fallido del usuario: " + usuario + "con mail: " + email
            log.fecha = Date.now()
            let bitacora = new Bitacora(log)
            bitacora.save()

            res.send(false)
        }
        //res.send(empresa)
    } catch (e) {

        res.send(e)
    }
}
