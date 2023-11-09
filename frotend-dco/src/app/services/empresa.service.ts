import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Empresa } from '../models/empresa.model'

@Injectable({
    providedIn: 'root'
})

export class empresaService {
    url = 'http://localhost/back/empresa';

    constructor(private http: HttpClient) { }
    agregar(empresa: Empresa): Observable<any> {
        return this.http.post(this.url + "/registro", empresa)
    }
    buscar(correo: string): Observable<any> {
        return this.http.get(this.url + "/registro/" + correo)
    }
    login(infoLogin: object): Observable<any> {
        return this.http.post(this.url + "/login", infoLogin)
    }
    seguridad(idEmpresa: string): Observable<any> {
        return this.http.get(this.url + "/seguridad/" + idEmpresa)
    }
    rellenar(idEmpresa: string): Observable<any> {
        return this.http.get(this.url + "/rellenarInfo/" + idEmpresa)
    }
    actualizar(infoEmpresa: object): Observable<any> {
        return this.http.post(this.url + "/actualizarInfo/", infoEmpresa)
    }
    logo(idEmpresa: string): Observable<any> {
        return this.http.get(this.url + "/logo/" + idEmpresa)
    }
    aggCategoria(infoCategoria: object): Observable<any> {
        return this.http.post(this.url + "/aggCategoria", infoCategoria)
    }
    getCategorias(idEmpresa: string): Observable<any> {
        return this.http.get(this.url + "/getCategorias/" + idEmpresa)
    }
    editCategorias(infoCategoria: object): Observable<any> {
        return this.http.put(this.url + "/updCategorias", infoCategoria)
    }

    delCategorias(idEmpresa: string, categoria: string): Observable<any> {
        return this.http.delete(this.url + `/delCategorias/?idEmpresa=${idEmpresa}&categoria=${categoria}`)
    }
    getProductos(idEmpresa: string): Observable<any> {
        return this.http.get(this.url+'/getProductos/'+idEmpresa)
    }
    getCantProductos(idEmpresa: string): Observable<any>{
        return this.http.get(this.url+'/getCantProductos/'+idEmpresa)
    }
    actualizarProducto(infoActualizar: object):Observable<any>{
      return this.http.put(this.url+'/actualizarProducto',infoActualizar)
    }
    eliminarProducto(idProducto: string, idEmpresa:string):Observable<any>{
        return this.http.delete(this.url+`/eliminarProducto/?idProducto=${idProducto}&idEmpresa=${idEmpresa}`)
    }
    getEmpresas(): Observable<any>{
        return this.http.get(this.url+'/listaEmpresas');
    }
    getEmpresa( id : String): Observable<any>{
        return this.http.get(this.url+`/empresa/${id}`);
    }
    bloquearEmpresa(id: Object): Observable<any>{
        return this.http.put(this.url+'/bloquearEmpresa',id);
    }
    delEmpresa (idEmpresa: string,idAdmin: string): Observable<any>{
        return this.http.delete(this.url+`/eliminarEmpresa/${idEmpresa}/${idAdmin}`)
    }
    desbloquearEmpresa(idEmpresa: Object):Observable<any>{        
        return this.http.put(this.url+'/desbloquearEmpresa',idEmpresa)
    }
    venta(venta: object):Observable<any>{
        return this.http.post(this.url+'/venta',venta)
    }
    historial(idEmpresa: string):Observable<any>{
        return this.http.get(this.url+'/historial/'+idEmpresa)
    }
    cantVendidosXprod(idEmpresa: string):Observable<any>{
        return this.http.get(this.url+'/cantVendidosXprod/'+idEmpresa)
    }
    prodVendidosXcat(idEmpresa: string):Observable<any>{
        return this.http.get(this.url+'/prodVendidosXcat/'+idEmpresa)
    }
    gananciasXcat(idEmpresa: string):Observable<any>{
        return this.http.get(this.url+'/gananciasXcat/'+idEmpresa)
    }
    top10(idEmpresa: string):Observable<any>{
        return this.http.get(this.url+'/top10/'+idEmpresa)
    }
}