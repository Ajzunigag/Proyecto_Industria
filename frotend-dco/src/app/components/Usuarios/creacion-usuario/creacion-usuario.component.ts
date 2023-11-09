import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-creacion-usuario',
  templateUrl: './creacion-usuario.component.html',
  styleUrls: ['./creacion-usuario.component.css']
})
export class CreacionUsuarioComponent implements OnInit {
  usuarioForm:FormGroup;

  constructor(private fb: FormBuilder,
              private router:Router,
              private toastr: ToastrService,
              private _usuarioService: UsuarioService) {
    this.usuarioForm = this.fb.group({
      nombre:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      contraseña:['',Validators.required],
      terminos:['',Validators.required]

    })
   }
    
  ngOnInit(): void {
  }

  agregarUsuario(){
    const USUARIO: Usuario={
      nombre: this.usuarioForm.get('nombre')?.value,
      correo: this.usuarioForm.get('email')?.value,
      contrasenia: this.usuarioForm.get('contraseña')?.value,
      tipoUsuario: "Usuario",
      terminos: this.usuarioForm.get('terminos')?.value
    }
    console.log(USUARIO);
    this._usuarioService.guardarUsuario(USUARIO).subscribe(data=>{
      this.toastr.success('El usuario fue registrado con exito', 'Usuario Registrado');
      this.router.navigate(['/'])
    }, error=>{
      console.log(error);
      this.usuarioForm.reset();
    })
    
  }

}
