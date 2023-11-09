import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { empresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private empresaServicio: empresaService, private usuarioServicio: UsuarioService) { }

  ngOnInit(): void {
    if(this.seguridad()){
      this.getHistorial()
    }
  }
  seguridad() {
    let valido = true
    if (!window.localStorage.getItem('empresa')) {
      this.router.navigate(['/'])
      this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina')
      valido = false
    } else {
      this.empresaServicio.seguridad(window.localStorage.getItem('empresa')!).subscribe((res) => {
        if (res == null) {
          this.router.navigate(['/'])
          this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina', 'ERROR')
          window.localStorage.removeItem('empresa')
    window.localStorage.removeItem('usuario')
    window.localStorage.removeItem('usuarioAdmin')
    window.localStorage.removeItem('carrito')
          valido = false
        }
      })
    }
    return valido
  }
  cerrarSesion() {
    console.log('dio click en cerrar sesion')
    window.localStorage.removeItem('empresa')
    window.localStorage.removeItem('usuario')
    window.localStorage.removeItem('usuarioAdmin')
    window.localStorage.removeItem('carrito')
    this.toastr.success('Cierre de sesión exitoso')
    this.router.navigate(['/'])
  }
  historial:any
  getHistorial(){
    this.empresaServicio.historial(window.localStorage.getItem('empresa')!).subscribe((res)=>{
      this.historial=res
      console.log(this.historial)
    })
  }
  actual={
    fecha:'',
    nombreComprador: '',
    correoComprador: '',
    precio: '',
    producto: '',
  }
  detalles(idVenta:string){    
    this.historial.forEach((element:any) => {
      if(element._id==idVenta){
        let fecha1=element.fecha.split('T',1)
        let fecha2=element.fecha.split('T',2)
        this.actual.fecha=fecha1+' '+fecha2[1].split('.',1)
        this.actual.precio=element.precio
        this.actual.producto=element.nombre
        

        this.usuarioServicio.obtenerUsuario(element.idComprador).subscribe((res)=>{
          this.actual.nombreComprador=res.usuario.nombre
          this.actual.correoComprador=res.usuario.correo
        })
      }
    });
  }
}
