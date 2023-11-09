import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-iniciar-usuario',
  templateUrl: './iniciar-usuario.component.html',
  styleUrls: ['./iniciar-usuario.component.css']
})
export class IniciarUsuarioComponent implements OnInit {

  usuarioForm:FormGroup;


  constructor(private fb: FormBuilder,
              private router:Router,
              private toastr: ToastrService,
              private _usuarioServicio: UsuarioService) {
    this.usuarioForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      contrasenia:['',Validators.required],
    })
   }

  ngOnInit(): void {
  }

  agregarUsuario(){
    console.log(this.usuarioForm);
    this.toastr.success('Inicio de sesión exitoso', 'Inicio de Sesión');
    this.router.navigate(['/Tiendas'])
  }

  login() {
    let login = this.usuarioForm.value
    this. _usuarioServicio.login(login).subscribe(data => {
      if (data) {
        
      
        this.toastr.success('Ingreso de forma exitosa', 'Bienvenido');
        window.localStorage.setItem('usuario', data[0]._id)

        this.router.navigate(['/Tiendas'])
      }else{
        this.toastr.error('Datos incorrectos', 'Correo o contraseña no validos');
      }

    }, error => {
      console.log(error);
      this.usuarioForm.reset();
      this.toastr.error('Algo salio mal en el login')
    })
  }

  get correo() {
    return this.usuarioForm.get('email')
  }
  get contrasena() {
    return this.usuarioForm.get('contrasenia')
  }
  
}
