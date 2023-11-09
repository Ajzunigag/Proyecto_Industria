import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Carrito } from 'src/app/models/interfaz-carrito';
import { ToastrService } from 'ngx-toastr';
import { PaginaService } from 'src/app/services/pagina.service';
import { empresaService } from 'src/app/services/empresa.service';
@Component({
  selector: 'app-pagina-ver-creacion-dos',
  templateUrl: './pagina-ver-creacion-dos.component.html',
  styleUrls: ['./pagina-ver-creacion-dos.component.css']
})
export class PaginaVerCreacionDosComponent implements OnInit {
  paginaForm: FormGroup;
  htmlStr = ""
  cssStr = ""
  html: string = ""
  css: string = ""
  javascript: string = ""
  empresaId: number = 0;
  productoForm: FormGroup;
  nombre: string = "";
  precio: number = 0;
  img: string = "";
  vendedor: string = "";
  descripcion: string = "";
  listProductos: Producto[] = [];
  e1 = "";

  carrito: Carrito[] = [];
  constructor(private aRoute: ActivatedRoute,
    private _productoService: ProductoService,
    private _empresaService: empresaService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _paginaService: PaginaService,
    private router: Router) {

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      img: ['', Validators.required]
    })

    this.paginaForm = this.fb.group({
      html: ['', Validators.required],
      css: ['', [Validators.required]],
      javascript: ['', Validators.required],
      empresaId: ['', Validators.required],

    })

  }

  ngOnInit(): void {
    this.logeado()
    this.getIdEmpresa()
    this.getIdProducto()
    this.obtenerProducto();
    
  }

  idEmpresa!: string
  idProdcuto!: string
  getIdProducto() {
    this.idProdcuto = this.aRoute.snapshot.paramMap.get('idProducto')!
  }
  logged!: boolean



  

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
  carrito2: Carrito[] = [];
  
  logeado() {
    if (window.localStorage.getItem('empresa') || window.localStorage.getItem('usuario')) {
      this.logged = true
    } else {
      this.logged = false
    }
  }

  
  getIdEmpresa() {
    this.idEmpresa = this.aRoute.snapshot.paramMap.get('idEmpresa')!;
    console.log(this.idEmpresa)
  }
  obtenerProducto(){
    console.log("idProducto",this.idProdcuto)
    if(this.idProdcuto!==null){
      this._productoService.buscarProducto(this.idProdcuto).subscribe(data=>{
        this.idProdcuto = data._id;
       this.nombre =data.nombre;
       this.img= data.img;
       this.precio = data.precio;
       this.descripcion = data.descripcion;
       this.vendedor = data.vendedor;
      })
    }
  }

  carritoCompras(){
    if(this.idProdcuto!==null){
      this._productoService.buscarProducto(this.idProdcuto).subscribe(data=>{
        if(window.localStorage.getItem('carrito')==null){
          let productoAux= {
            idProducto: data._id,
            nombre:data.nombre,
            precio:data.precio,
            img:data.img,
            des:data.descripcion
          }
          this.carrito.push(productoAux);
          this.toastr.success('Se agrego al carrito')
          window.localStorage.setItem('carrito',JSON.stringify(this.carrito));
        }else{
          this.carrito= JSON.parse(window.localStorage.getItem('carrito')|| '{}')
          let comprobante=false;
          this.carrito.forEach(e =>{
            if(e.idProducto==data._id){
              comprobante=true;
              this.toastr.warning('Ya existe en su carrito')
            }
          })
          if(comprobante==false){
            let productoAux2= {
              idProducto: data._id,
              nombre:data.nombre,
              precio:data.precio,
              img:data.img,
              des:data.descripcion
            }
            this.carrito.push(productoAux2);
            window.localStorage.setItem('carrito',JSON.stringify(this.carrito));
            this.toastr.success('Se agrego al carrito')
          }
        }
      })
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
