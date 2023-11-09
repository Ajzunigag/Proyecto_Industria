import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { empresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private empresaServicio: empresaService) { }
  logo!: string
  categorias!: []


  agregarForm = new FormGroup({
    categoria: new FormControl('', [Validators.required]),
    idEmpresa: new FormControl(window.localStorage.getItem('empresa'))
  })
  editForm = new FormGroup({
    categoria: new FormControl('', [Validators.required]),
    idEmpresa: new FormControl(window.localStorage.getItem('empresa')),
    seleccionado: new FormControl('', [Validators.required]),
  })
  delForm = new FormGroup({
    categoria: new FormControl('', [Validators.required]),
    idEmpresa: new FormControl(window.localStorage.getItem('empresa'))
  })
  updForm = new FormGroup({
    categoria: new FormControl('', [Validators.required]),
    idEmpresa: new FormControl(window.localStorage.getItem('empresa'))
  })

  ngOnInit(): void {
    if(this.seguridad()) this.logoEmpresa()
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
  cerrarSesion(){
    console.log('dio click en cerrar sesion')
    this.toastr.success('Cierre de sesión exitoso')
    window.localStorage.removeItem('empresa')
    window.localStorage.removeItem('usuario')
    window.localStorage.removeItem('usuarioAdmin')
    window.localStorage.removeItem('carrito')
    this.router.navigate(['/'])
  }
  logoEmpresa() {
    this.empresaServicio.logo(window.localStorage.getItem('empresa')!).subscribe((res) => {
      this.logo = res[0].logo
    })
  }

  //agregar una categoria
  agregar() {
    console.log(this.agregarForm.value)
    this.empresaServicio.aggCategoria(this.agregarForm.value).subscribe((res) => {
      console.log(res)
      this.toastr.success('Categoria agregada con exito')
    })
    this.categoria?.setValue('')
  }
  get categoria() {
    return this.agregarForm.get('categoria')
  }
  
  //editar una categoria

  cargarSelectEditar() {
    this.empresaServicio.getCategorias(window.localStorage.getItem('empresa')!).subscribe((res) => {
      this.categorias = res[0].categorias
    })
  }
  editar(){
    this.empresaServicio.editCategorias(this.editForm.value).subscribe((res)=>{
      console.log(res)
      this.editForm.get('seleccionado')?.setValue('')
      this.editForm.get('categoria')?.setValue('')
      this.toastr.success('Categoria actualizada con exito')
    })
  }
  cargarSelectEliminar() {
    this.empresaServicio.getCategorias(window.localStorage.getItem('empresa')!).subscribe((res) => {
      this.categorias = res[0].categorias
    })
  }
  eliminar(){
    this.empresaServicio.delCategorias(this.delForm.value.idEmpresa!,this.delForm.value.categoria!).subscribe((res)=>{
      console.log(res)
      this.toastr.success('Categoria eliminada con exito')
    })
  }
}
