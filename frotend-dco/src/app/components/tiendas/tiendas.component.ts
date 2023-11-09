import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { empresaService } from 'src/app/services/empresa.service';
import { Carrito } from 'src/app/models/interfaz-carrito';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  constructor(private router: Router,
    private toastr: ToastrService,
    private empresaServicio: empresaService,
    private _productoService: ProductoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.logeado()
    this.getEmpresas()

  }
  usuario = window.localStorage.getItem('usuario')
  empresa = window.localStorage.getItem('empresa')


  logged!: boolean
  logeado() {
    if (window.localStorage.getItem('empresa') || window.localStorage.getItem('usuario')) {
      this.logged = true
    } else {
      this.logged = false
    }
  }

  cerrarSesion() {
    this.toastr.success('Cierre de sesión exitoso')
    window.localStorage.removeItem('empresa')
    window.localStorage.removeItem('usuario')
    window.localStorage.removeItem('usuarioAdmin')
    window.localStorage.removeItem('carrito')
    this.router.navigate(['/'])
    this.logeado()
  }

  listaEmpresas: any
  getEmpresas() {
    this.empresaServicio.getEmpresas().subscribe((res) => {
      if (res!=false) {
        this.listaEmpresas = res.listaEmpresas
        let temporal = new Array
        res.listaEmpresas.forEach((element: any) => {
          if (element.activo && element.productos.length > 0) {
            temporal.push(element)
          }
        });
        
        this.listaEmpresas = temporal

        if(this.listaEmpresas.length==0){
          this.toastr.info('Parece que ninguna tienda tiene productos disponibles, lo sentimos :(')
        }
        
        console.log(this.listaEmpresas)
      }else{
        this.toastr.error('No hay empresas disponibles')
      }

    })
  }

  idEmpresa!: string
  getIdEmpresa() {
    this.idEmpresa = this.route.snapshot.paramMap.get('idEmpresa')!;
    console.log(this.idEmpresa)
  }

  listProductos: Producto[] = [];

  carrito2: Carrito[] = [];
  mostrarCarrito() {
    if (window.localStorage.getItem('carrito') == null) {
      this.toastr.warning('Aun no agregado ningun producto a su carrito :(')
    } else {
      this.carrito2 = JSON.parse(window.localStorage.getItem('carrito') || '{}')
      if (this.carrito2.length == 0) {
        this.toastr.warning('Aun no agregado ningun producto a su carrito :(')
        console.log(this.carrito2.length)
      } else {
        this.carrito2 = JSON.parse(window.localStorage.getItem('carrito') || '{}')
        this.toastr.success('Productos cargados con Exito :)')
      }

    }
  }
  obtenerProductosCarrito() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProductoCarrito(id: any) {
    this.carrito2 = JSON.parse(window.localStorage.getItem('carrito') || '{}')
    let eliminarAux = id - 1;
    this.carrito2.splice(eliminarAux, 1);
    console.log(id);
    window.localStorage.setItem('carrito', JSON.stringify(this.carrito2));
    console.log(this.carrito2)
    this.toastr.warning('Se elimino de su carrito el producto con exito')

  }
}
