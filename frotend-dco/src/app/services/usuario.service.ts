import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost/back/api/usuarios'

  constructor(private http:HttpClient) { }

  guardarUsuario(usuario: Usuario): Observable<any>{
    return this.http.post(this.url,usuario);
  }

  listaUsuarios(): Observable<any>{
    return this.http.get(this.url);
  }

  obtenerUsuario( id : String): Observable<any>{
    return this.http.get(this.url+`/${id}`);
  }
  
  login(infornacionLogin: object): Observable<any>{
    return this.http.post(this.url+"/login/",infornacionLogin)
  }

  actualizarUsuario(informacion: object, idAdmin:string): Observable<any>{
    return this.http.put(this.url+"/actualizar/"+idAdmin,informacion)
  }


}
