export class Producto {
    _id?: number;
    nombre: string;
    precio: number;
    img: string;
    descripcion: string;
    empresa: string;
    categoria:string;

    constructor(nombre:string,precio: number,img: string, descripcion:string,empresa:string,categoria:string){
        this.nombre=nombre;
        this.precio=precio;
        this.img=img;
        this.descripcion=descripcion;
        this.empresa=empresa;
        this.categoria = categoria;
    }

}