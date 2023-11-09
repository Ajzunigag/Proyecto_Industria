import { Component, OnInit } from '@angular/core';
import { empresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-empresas',
  templateUrl: './admin-empresas.component.html',
  styleUrls: ['./admin-empresas.component.css']
})
export class AdminEmpresasComponent implements OnInit {

  listaEmpresas = [
    {
      nombre:'',
      _id:'',
      plan:''
    }
  ]

  constructor(
    private empresaService : empresaService,
    private router: Router, 
    private toastr: ToastrService, 
    private adminServicio: AdminService
  ) { }

  ngOnInit(): void {
    this.seguridad()
    this.getEmpresas();
  }

  getEmpresas(){
    this.empresaService.getEmpresas().subscribe(data=>{
      if(data.acceso){
        console.log(data.mensaje);
        this.listaEmpresas = data.listaEmpresas;
      }else{
        console.log(data.mensaje);
      }
    }, error=>{
      console.log(error);
    });
  }

  seguridad() {
    if (!window.localStorage.getItem('usuarioAdmin')) {
      this.router.navigate(['/'])
      this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina')
    } else {
      this.adminServicio.seguridad(window.localStorage.getItem('usuarioAdmin')!).subscribe((res) => {
        if (res.name != "CastError") {
          if (res == false) {
            this.router.navigate(['/'])
            this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina')
          }
        } else {
          this.router.navigate(['/'])
          this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina')
        }

      })
    }
  }
}
