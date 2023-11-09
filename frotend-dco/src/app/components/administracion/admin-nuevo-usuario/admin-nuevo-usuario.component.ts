import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-nuevo-usuario',
  templateUrl: './admin-nuevo-usuario.component.html',
  styleUrls: ['./admin-nuevo-usuario.component.css']
})
export class AdminNuevoUsuarioComponent implements OnInit {

  formularioUsuario = new FormGroup({
    nombre: new FormControl(''),
    tipoUsuario: new FormControl(''),
    contrasenia: new FormControl(''),
    correo: new FormControl('')
  });

  constructor(
    private usuarioService : UsuarioService,
    private router : Router,
    private toastr : ToastrService,
    private adminServicio: AdminService
  ) { }

  ngOnInit(): void {
    this.seguridad()
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

  agregarUsuario(){
    const USUARIO: Usuario={
      nombre: this.formularioUsuario.value.nombre!,
      correo: this.formularioUsuario.value.correo!,
      contrasenia: this.formularioUsuario.value.contrasenia!,
      tipoUsuario: this.formularioUsuario.value.tipoUsuario!,
      terminos: true
    }
    console.log(USUARIO);
    this.usuarioService.guardarUsuario(USUARIO).subscribe(data=>{
      this.toastr.success('El usuario fue registrado con exito', 'Usuario Registrado');
      this.router.navigate(['admin/usuarios'])
    }, error=>{
      console.log(error);
      this.formularioUsuario.reset();
    })
    
  }

}
