export class Plantilla {
    _id?: number;
    nombre: string;
    html: string;
    css: string;
    javascript: string;
    ;

    constructor(nombre: string, html:string, css: string, javascript: string){
        this.nombre=nombre;
        this.html=html;
        this.css=css;
        this.javascript=javascript;

    }
}