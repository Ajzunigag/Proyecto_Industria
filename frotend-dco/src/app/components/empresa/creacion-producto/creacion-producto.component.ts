import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { empresaService } from 'src/app/services/empresa.service';
import { AdminService } from 'src/app/services/admin.service'

@Component({
  selector: 'app-creacion-producto',
  templateUrl: './creacion-producto.component.html',
  styleUrls: ['./creacion-producto.component.css']
})
export class CreacionProductoComponent implements OnInit {
  productoForm: FormGroup;
  uploadedFiles!: Array<File>;
  img!: string;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private adminServicio: AdminService,
    private empresaServicio: empresaService) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required]],
      img: ['', Validators.required],
      descripcion: ['', [Validators.required]],
      empresa: ['', Validators.required],
      categoria: ['', Validators.required]
    })
  }
  categorias = []
  permiteAgregar = true
  ngOnInit(): void {
    if (this.seguridad()) {
      this.avisoCantMax()
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
  avisoCantMax() {
    var cantidad = 0
    var permitido = 0
    var tipoPlan: string
    this.empresaServicio.getCantProductos(window.localStorage.getItem('empresa')!).subscribe((res) => {
      cantidad = res.cantidad

      this.empresaServicio.getEmpresa(window.localStorage.getItem('empresa')!).subscribe((res) => {
        tipoPlan = res.empresa.plan


        this.adminServicio.obtenerPlan(tipoPlan).subscribe((res) => {
          permitido = res.plan.maxArticulos
          console.log(cantidad)
          if (cantidad >= permitido) {
            this.toastr.warning('Ya llegó al limite de articulos permitidos, cuenta con: ' + cantidad + ' articulos, y su plan permite: ' + permitido, 'Advertencia')
            this.permiteAgregar = false
          }
        }
        )
      })
    })


  }

  agregarProducto(element: any) {
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('nombre')?.value,
      precio: this.productoForm.get('precio')?.value,
      img: this.img,
      descripcion: this.productoForm.get('descripcion')?.value,
      empresa: window.localStorage.getItem('empresa')!,
      categoria: this.productoForm.get('categoria')?.value
    }
    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
      this.toastr.success('El producto fue registrado con exito', 'Producto Registrado');
      this.router.navigate(['/empresa/Productos'])
    }, error => {
      console.log(error);
      this.productoForm.reset();
    })

  }

  subir(element: any) {
    this.uploadedFiles = element.target.files;
    console.log(this.uploadedFiles)

    //previsualizacion de la imagen que se subira y creacion del b64 que se guardará para generar el logo o cualquier archivo que se quiera subir
    const reader = new FileReader()
    reader.onload = () => this.img = reader.result as string
    reader.readAsDataURL(this.uploadedFiles[0])
    console.log(this.img)
  }


}
