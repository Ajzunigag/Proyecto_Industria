export class Empresa {
    _id?: number;
    nombre: string;
    correo: string;
    descripcion: string;
    logo: string;
    contrasena: string;
    plan: string;
    bancoMultimedia: any;
    estilo1:string|null;
    estilo2:string|null;
    estilo3:string|null;
    productos: any;
    categorias: any;
    activo: boolean=true

    constructor(nombre: string, correo: string, descripcion: string,logo: string, contrasena: string, plan: string, bancoMultimedia: any, productos: any, categorias: any, activo: boolean
        , estilo1: string, estilo2: string, estilo3: string
    ) {
        this.nombre = nombre
        this.correo = correo
        this.descripcion=descripcion
        this.logo=logo
        this.contrasena = contrasena
        this.plan = plan
        this.bancoMultimedia = bancoMultimedia
        this.productos = productos
        this.categorias=categorias
        this.activo=activo
        this.estilo1=estilo1;
        this.estilo2=estilo2;
        this.estilo3=estilo3;
    }
}