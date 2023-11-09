import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { empresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  id: string | null;
  productoForm: FormGroup;
  nombre: string = "";
  precio: number = 0;
  img: string = "";
  descripcion: string = "";
  constructor(private aRoute: ActivatedRoute,
    private _productoService: ProductoService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private empresaServicio: empresaService) {

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      img: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  archivo!: string;
  archivo2!: string;
  uploadedFiles!: Array<File>;
  categorias = []
  ngOnInit(): void {
    if (this.seguridad()) {
      this.obtenerProducto();
      this.selectCategorias()
    }
  }
  seguridad() {
    let valido = true
    if (!window.localStorage.getItem('empresa')) {
      this.router.navigate(['/'])
      this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina')
      valido = false
    } else {
      this.empresaServicio.seguridad(window.localStorage.getItem('empresa')!).subscribe((res) => {
        if (res == null) {
          this.router.navigate(['/'])
          this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina', 'ERROR')
          window.localStorage.removeItem('empresa')
    window.localStorage.removeItem('usuario')
    window.localStorage.removeItem('usuarioAdmin')
    window.localStorage.removeItem('carrito')
          valido = false
        }
      })
    }
    return valido
  }
  selectCategorias() {
    this.empresaServicio.getCategorias(window.localStorage.getItem('empresa')!).subscribe((res) => {
      //this.categorias=res
      this.categorias = res[0].categorias
    })
  }
  obtenerProducto() {

    if (this.id !== null) {
      this._productoService.buscarProducto(this.id).subscribe(data => {
        if (data != null) {
          this.nombre = data.nombre;
          this.img = data.img;
          this.precio = data.precio;
          this.descripcion = data.descripcion;

          this.productoForm.get('nombre')?.setValue(data.nombre)
          this.productoForm.get('precio')?.setValue(data.precio)
          this.productoForm.get('categoria')?.setValue(data.categoria)
          this.productoForm.get('descripcion')?.setValue(data.descripcion)
        } else {
          this.toastr.error('Esa página no contiene datos o no existe, no hay nada que hacer ahí', 'Acceso denegado')
          this.router.navigate(['/empresa/Productos'])
        }

      })
    }
  }

  subir(element: any) {
    this.uploadedFiles = element.target.files;


    //previsualizacion de la imagen que se subira y creacion del b64 que se guardará para generar el logo o cualquier archivo que se quiera subir

    if (this.uploadedFiles[0].type.split('/')[1] != 'apng' && this.uploadedFiles[0].type.split('/')[1] != 'gif' && this.uploadedFiles[0].type.split('/')[1] != 'ico' && this.uploadedFiles[0].type.split('/')[1] != 'jpeg' && this.uploadedFiles[0].type.split('/')[1] != 'png' && this.uploadedFiles[0].type.split('/')[1] != 'svg') {
      this.archivo2 = 'https://media.istockphoto.com/vectors/file-folder-office-supply-icon-vector-id1182976811?k=20&m=1182976811&s=612x612&w=0&h=vV6IdJW0drWpPcvlen_pOa8jgw41mqdpcaZn-mxoYLg='

      const reader = new FileReader()
      reader.onload = () => this.archivo = reader.result as string
      reader.readAsDataURL(this.uploadedFiles[0])
    } else {
      const reader = new FileReader()
      reader.onload = () => this.archivo = reader.result as string
      reader.readAsDataURL(this.uploadedFiles[0])
      const reader2 = new FileReader()
      reader2.onload = () => this.archivo2 = reader2.result as string
      reader2.readAsDataURL(this.uploadedFiles[0])
    }
  }
  actualiar() {
    if (!this.archivo) {
    } else {
      this.img = this.archivo
    }
    let infoActualizar = {
      nombre: this.productoForm.get('nombre')?.value,
      precio: this.productoForm.get('precio')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      img: this.img,
      idProducto: this.id
    }
    this.empresaServicio.actualizarProducto(infoActualizar).subscribe((res) => {
      this.obtenerProducto()
      this.toastr.success('Producto actualizado con exito', 'Exito')
    })
  }
  eliminar() {
    this.empresaServicio.eliminarProducto(this.id!, window.localStorage.getItem('empresa')!).subscribe((res) => {
      this.toastr.success('Producto eliminado de forma exitosa', 'Exito')
      this.router.navigate(['/empresa/VerProductos'])
    })
  }
  cerrarSesion() {

    this.toastr.success('Cierre de sesión exitoso')
    window.localStorage.removeItem('empresa')
    window.localStorage.removeItem('usuario')
    window.localStorage.removeItem('usuarioAdmin')
    window.localStorage.removeItem('carrito')
    this.router.navigate(['/'])

  }
}
