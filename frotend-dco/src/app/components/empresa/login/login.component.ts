import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { empresaService } from 'src/app/services/empresa.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  infoLogin = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    contrasena: new FormControl('', [Validators.required])
  })
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _empresaServicio: empresaService
  ) { }

  ngOnInit(): void {

  }

  login() {
    console.log(this.infoLogin)
    let login = this.infoLogin.value
    this._empresaServicio.login(login).subscribe(data => {
      if (data) {
        if (data[0].activo == true) {
          this.toastr.success('Ingreso de forma exitosa', 'Bienvenido');
          window.localStorage.setItem('empresa', data[0]._id)

          this.router.navigate(['/empresa/principal'])
        }else{
          this.toastr.error('Su empresa se encuentra baneada por alguna razon','Lo sentimos')
        }

      } else {
        this.toastr.error('Datos incorrectos', 'Correo o contraseña no validos');
      }

    }, error => {
      console.log(error);
      this.infoLogin.reset();
      this.toastr.error('Algo salio mal en el login')
    })
  }

  get correo() {
    return this.infoLogin.get('correo')
  }
  get contrasena() {
    return this.infoLogin.get('contrasena')
  }
}
