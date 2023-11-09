import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagina } from '../models/pagina';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {
  url = 'http://localhost/back/api/paginas'

  constructor(private http:HttpClient) { }

  guardarPagina(pagina: Pagina): Observable<any>{
    return this.http.post(this.url,pagina);
  }

  obtenerPagina( id : String): Observable<any>{
    console.log(this.url+"/"+id)
    return this.http.get(this.url+"/"+id)
  }
  
  getPaginas(): Observable<any>{
    return this.http.get(this.url)
  }
  
}
