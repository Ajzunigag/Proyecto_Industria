import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  formLogin = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    contrasena: new FormControl('', [Validators.required])
  })

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    
  }

  login() {
    let login = this.formLogin.value;
    this.adminService.login(login).subscribe(data => {
      console.log("data",data)
      if (data != null) {
        if (data != false) {
          console.log(data[0]._id);
          localStorage.setItem('usuarioAdmin', data[0]._id);
          this.toastr.success(data.mensaje, 'Bienvenido');
          this.router.navigate(['/admin/home']);
        }else{
          this.toastr.error('Correo o contraseña incorrectas','Login fallido');  
        }
      } else {
        this.toastr.error('Los datos ingresados no son validos','Datos no validos');
      }
    }, error => {
      console.log(error);
    });
  }
  get correo(){
    return this.formLogin.get('correo')
  }
  get contrasena(){
    return this.formLogin.get('contrasena')
  }

}
