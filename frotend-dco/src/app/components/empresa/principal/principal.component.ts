import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { empresaService } from 'src/app/services/empresa.service';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private empresaServicio: empresaService, private adminServicio: AdminService) { }
  logo!: string

  ngOnInit(): void {
    if(this.seguridad()) {
      this.logoEmpresa()
      this.verificarPlan()
    }
  }
  seguridad() {
    let valido=true
    if (!window.localStorage.getItem('empresa')) {
      this.router.navigate(['/'])
      this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina')
      valido=false
    } else {
      this.empresaServicio.seguridad(window.localStorage.getItem('empresa')!).subscribe((res) => {
        if (res == null) {
          this.router.navigate(['/'])
          this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina','ERROR')
          window.localStorage.removeItem('empresa')
    window.localStorage.removeItem('usuario')
    window.localStorage.removeItem('usuarioAdmin')
    window.localStorage.removeItem('carrito')
          valido=false
        }
      })
    }
    return valido
  }
  
  estadisticas:boolean=false
  verificarPlan(){
     //verificacion de plan
    //traer la empresa y los planes para luego comparar el plan de la empresa con los planes y cuales tienen estadisticas activadas
    this.empresaServicio.getEmpresa(window.localStorage.getItem('empresa')!).subscribe((res) => {
      let plan = res.empresa.plan

      this.adminServicio.getPlanes().subscribe((res) => {
        let planes = res.listaPlanes

        for (let i = 0; i < planes.length; i++) {
          const element = planes[i];
          if (element._id == plan && element.estadisticas == 1) {
            this.estadisticas = true
            break
          } else {
            this.estadisticas = false
          }
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
  logoEmpresa() {
    this.empresaServicio.logo(window.localStorage.getItem('empresa')!).subscribe((res) => {
      this.logo = res[0].logo
    })
  }

}
