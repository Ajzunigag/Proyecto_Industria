import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { empresaService } from 'src/app/services/empresa.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalEstComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private empresaServicio: empresaService, private adminServicio: AdminService) { }

  ngOnInit(): void {
    this.seguridad()
  }

  formulario = new FormGroup({
    grafico: new FormControl(),
  })

  mostrar() {
    console.log(this.getGrafico())
  }

  getGrafico() {
    return this.formulario.get("grafico")?.value
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
    //verificacion de plan
    //traer la empresa y los planes para luego comparar el plan de la empresa con los planes y cuales tienen estadisticas activadas
    this.empresaServicio.getEmpresa(window.localStorage.getItem('empresa')!).subscribe((res) => {
      let plan = res.empresa.plan

      this.adminServicio.getPlanes().subscribe((res) => {
        let planes = res.listaPlanes

        for (let i = 0; i < planes.length; i++) {
          const element = planes[i];
          if (element._id == plan && element.estadisticas == 1) {
            valido = true
            break
          } else {
            valido = false
          }
        }
        if (!valido) {
          this.toastr.error('No dispone de un plan para acceder a las estadisticas :(', 'ERROR')
          this.router.navigate(['/empresa/principal'])
        }
      })
    })
    
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
}
