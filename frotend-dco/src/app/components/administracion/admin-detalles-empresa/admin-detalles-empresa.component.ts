import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { empresaService } from 'src/app/services/empresa.service';

import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-admin-detalles-empresa',
  templateUrl: './admin-detalles-empresa.component.html',
  styleUrls: ['./admin-detalles-empresa.component.css']
})
export class AdminDetallesEmpresaComponent implements OnInit {

  idEmpresa = "";
  datosEmpresa = {
    nombre: '',
    _id: '',
    correo: '',
    activo: Boolean,
    descripcion: '',
    logo: ''
  };
  activo:any  

  constructor(
    private route: ActivatedRoute,
    private empresaService: empresaService,
    private toastr: ToastrService,
    private router: Router,
    private adminServicio: AdminService,
  ) { }

  ngOnInit(): void {
    this.seguridad()
    this.getEmpresa();
  }

  getEmpresa() {
    this.idEmpresa = this.route.snapshot.paramMap.get('id')!;
    this.empresaService.getEmpresa(this.idEmpresa).subscribe(data => {
      if (data == null || data==false) {
        this.toastr.error('Esa página no contiene datos o no existe, no hay nada que hacer ahí', 'Acceso denegado')
        this.router.navigate(['/admin/empresas'])
      } else {
        if (data.acceso) {
          console.log(data);
          this.datosEmpresa = data.empresa;
          console.log(this.datosEmpresa)
          this.activo=data.empresa.activo
          this.logoEmpresa();
        } else {
          console.log(data.mensaje);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  bloquearEmpresa() {
    if (this.datosEmpresa.activo!) {
      this.empresaService.bloquearEmpresa({ 'id': this.idEmpresa,'idAdmin':window.localStorage.getItem('usuarioAdmin')}).subscribe(data => {
        if (data.acceso) {
          console.log(data.mensaje);
          this.toastr.success('Empresa bloqueada exitosamente');
          this.getEmpresa();
          this.activo=false
        } else {
          console.log(data.mensaje);
        }
      }, error => {
        console.log(error);
      });
    }
  }
  desbloquearEmpresa(){
    if (!this.activo) {
      this.empresaService.desbloquearEmpresa({ 'id': this.idEmpresa, 'idAdmin':window.localStorage.getItem('usuarioAdmin')}).subscribe(data => {
        if (data.acceso) {
          console.log(data.mensaje);
          this.toastr.success('Empresa desbloqueada exitosamente');
          this.getEmpresa();
          this.activo=false
        } else {
          console.log(data.mensaje);
        }
      }, error => {
        console.log(error);
      });
    }
  }

  eliminarEmpresa() {
    let ids={
      idEmpresa: this.idEmpresa,
      idAdmin: window.localStorage.getItem('usuarioAdmin')
    }
    console.log(ids)
    this.empresaService.delEmpresa(ids.idEmpresa, ids.idAdmin!).subscribe(data => {
      if (data.acceso) {
        console.log(data.mensaje);
        this.toastr.success('Empresa eliminada exitosamente');
        this.router.navigate(['/admin/empresas']);
      } else {
        console.log(data.mensaje);
      }
    }, error => {
      console.log(error);
    });
  }

  logoEmpresa() {
    this.empresaService.logo(this.datosEmpresa._id).subscribe((res) => {
      this.datosEmpresa.logo = res[0].logo
    })
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
