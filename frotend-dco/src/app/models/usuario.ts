export class Usuario {
    _id?: number;
    nombre: string;
    correo: string;
    contrasenia: string;
    tipoUsuario: string;
    terminos: boolean;

    constructor(nombre:string,correo: string,contrasenia: string, tipoUsuario: string,terminos: boolean ){
        this.nombre=nombre;
        this.correo=correo;
        this.contrasenia=contrasenia;
        this.tipoUsuario=tipoUsuario;
        this.terminos=terminos;

    }

}