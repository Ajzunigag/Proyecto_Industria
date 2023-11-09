import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = 'http://localhost/back/admin';

  constructor(
    private http: HttpClient
  ) { }

  login(infoLogin: object): Observable<any>{
    return this.http.post(this.url+"/login",infoLogin)
  }

  getPlanes(): Observable<any>{
    return this.http.get(this.url+"/planes")
  }
  seguridad(idUsuario: string):Observable<any>{
    return this.http.get(this.url+"/seguridad/"+idUsuario)
  }

  nuevoPlan(infoPlan: object): Observable<any>{
    return this.http.post(this.url+"/nuevoPlan", infoPlan)
  }

  obtenerPlan( id : String): Observable<any>{
    return this.http.get(this.url+`/plan/${id}`);
  }

  actualizarPlan(informacion: object): Observable<any>{
    return this.http.put(this.url+"/plan/actualizar/",informacion)
  }

  nuevaPlantilla(infoPlantilla: object): Observable<any>{
    return this.http.post(this.url+"/nuevaPlantilla", infoPlantilla)
  }

  getPlantillas(): Observable<any>{
    return this.http.get(this.url+"/plantillas")
  }

  obtenerPlantilla( id : String): Observable<any>{
    return this.http.get(this.url+`/plantilla/${id}`);
  }

  actualizarPlantilla(informacion: object): Observable<any>{
    return this.http.put(this.url+"/plantilla/actualizar/",informacion)
  }

}
