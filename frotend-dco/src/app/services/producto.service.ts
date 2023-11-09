import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
    url = 'http://localhost/back/api/productos'

  constructor(private http:HttpClient) { }

    guardarProducto(producto: Producto): Observable<any>{
    return this.http.post(this.url,producto);
    }
    buscarProducto (id: string): Observable<any> {
      console.log(this.url+"/"+id)
    return this.http.get(this.url+"/"+id)
    }

    getProductos(): Observable<any>{
      return this.http.get(this.url)
    }

}
