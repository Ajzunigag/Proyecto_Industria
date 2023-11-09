import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagina } from 'src/app/models/pagina';
import { PaginaService } from 'src/app/services/pagina.service';
import { Carrito } from 'src/app/models/interfaz-carrito';
import { empresaService } from 'src/app/services/empresa.service';
@Component({
  selector: 'app-pagina-ver-creacion',
  templateUrl: './pagina-ver-creacion.component.html',
  styleUrls: ['./pagina-ver-creacion.component.css']
})
export class PaginaVerCreacionComponent implements OnInit {
    paginaForm: FormGroup;
  html: string = ""
  css: string = ""
  javascript: string = ""
  empresaId: number = 0;
  htmlStr = ""
  cssStr = ""
  carrito2: Carrito[] = [];
  listProductos: Producto[] = [];
  e1 = "";
  constructor(private _productoService: ProductoService, private _empresaService: empresaService, private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _paginaService: PaginaService,
    private route: ActivatedRoute) {
    this.paginaForm = this.fb.group({
      html: ['', Validators.required],
      css: ['', [Validators.required]],
      javascript: ['', Validators.required],
      empresaId: ['', Validators.required],



    })
  }

  ngOnInit(): void {
    this.getIdEmpresa()
    this.obtenerProductos();
    this.obtenerPagina();
    this.logeado()

  }
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

  }
  idEmpresa!: string
  getIdEmpresa() {
    this.idEmpresa = this.route.snapshot.paramMap.get('idEmpresa')!;
    console.log("aca", this.idEmpresa)
  }

  obtenerProductos() {

    this._empresaService.getProductos(this.idEmpresa!).subscribe(res => {
      console.log(res);
      this.listProductos = res;

      if (this.listProductos.length == 0) {
        this.toastr.error('No hay ningun producto en la lista', 'AVISO')
      }
    }, error => {
      console.log(error);
    })
  }

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

  eliminarProductoCarrito(id: any) {
    this.carrito2 = JSON.parse(window.localStorage.getItem('carrito') || '{}')
    let eliminarAux = id - 1;
    this.carrito2.splice(eliminarAux, 1);
    console.log(id);
    window.localStorage.setItem('carrito', JSON.stringify(this.carrito2));
    console.log(this.carrito2)
    this.toastr.warning('Se elimino de su carrito el producto con exito')

  }

  obtenerPagina() {
    console.log(this.idEmpresa)
    this._empresaService.getEmpresa(this.idEmpresa).subscribe(data => {
      if (data) {
        console.log(data)
        this.e1 = data.empresa.estilo1;
        console.log(this.e1)
        this.renderizarPagina();
      } else {
        this.toastr.error('Datos incorrectos', 'error');
      }
    }, error => {
      console.log(error);
      this.paginaForm.reset();
      this.toastr.error('Algo salio mal en el login')
    })
  }

  renderizarPagina() {

    this._paginaService.obtenerPagina(this.e1).subscribe(data => {
      if (data) {
        this.html = data.html;
        this.css = data.css;
        this.javascript = data.javascript;
        this.empresaId = data.empresaId;
        this.htmlStr = data.html;
        this.cssStr = data.css;
        console.log(this.cssStr)

      } else {
        this.toastr.error('Datos incorrectos', 'error');
      }

    }, error => {
      console.log(error);
      this.paginaForm.reset();
      this.toastr.error('Algo salio mal en el login')
    })
  }


}
