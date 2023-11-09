export class Plan {
    _id?: number;
    nombre: string;
    descripcion: string
    maxArticulos: number;
    estadisticas: number;

    constructor(nombre: string, descripcion: string, maxArticulos: number, estadisticas: number
    ) {
        this.nombre = nombre
        this.descripcion = descripcion
        this.maxArticulos = maxArticulos
        this.estadisticas = estadisticas
    }
}