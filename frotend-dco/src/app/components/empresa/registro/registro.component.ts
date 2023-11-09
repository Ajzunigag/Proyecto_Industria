import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.model';
import { ToastrService } from 'ngx-toastr';
import { empresaService } from 'src/app/services/empresa.service';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    contrasena: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required]),
    termino: new FormControl(false, [Validators.requiredTrue])
  })
  existe: boolean = false
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _empresaServicio: empresaService,
    private adminServicio: AdminService
  ) { }

  ngOnInit(): void {
    this.selectPlanes()
  }

  registrar() {
    const empresa: Empresa = {
      nombre: this.nombre?.value!,
      correo: this.correo?.value!,
      descripcion: '',
      logo: '',
      contrasena: this.contrasena?.value!,
      plan: this.plan?.value!,
      bancoMultimedia: [],
      productos: [],
      categorias: [],
      activo: true,
      estilo1:"1",
      estilo2:"2",
      estilo3:"3"

    }
    console.log("empresa: ", empresa)
    this._empresaServicio.agregar(empresa).subscribe(data => {
      this.toastr.success('Se registro de forma exitosa', 'Registro de empresa exitoso');
      this.router.navigate(['/'])
      console.log(data)
    }, error => {
      console.log(error);
      this.formulario.reset();
      this.toastr.error('Algo salio mal en el registro')
    })
  }
  buscar() {
    this._empresaServicio.buscar(this.correo?.value!).subscribe(data => {
      if (data[0]) {
        this.toastr.error('Ese correo ya está en uso')
        this.existe = true;
      } else {
        this.registrar()
      }
    }, error => {
      console.log(error)
      this.toastr.error('Algo salio mal en el registro')
    })
  }
  planes: any
  selectPlanes() {
    this.adminServicio.getPlanes().subscribe((res) => {
      this.planes=res.listaPlanes
    })
  }

  changeSelect() {
    if (this.plan?.value == "...") {
      this.plan.setValue('')
    }else{
      console.log(this.plan?.value)
    }
  }
  get nombre() {
    return this.formulario.get('nombre')
  }
  get correo() {
    return this.formulario.get('correo')
  }
  get contrasena() {
    return this.formulario.get('contrasena')
  }
  get plan() {
    return this.formulario.get('plan')
  }
  get termino() {
    return this.formulario.get('termino')
  }



}
