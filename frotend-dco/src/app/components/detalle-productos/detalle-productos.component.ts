import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Carrito } from 'src/app/models/interfaz-carrito';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-productos',
  templateUrl: './detalle-productos.component.html',
  styleUrls: ['./detalle-productos.component.css']
})
export class DetalleProductosComponent implements OnInit {

  id:string | null;
  productoForm:FormGroup;
  nombre:string="";
  precio:number=0;
  img:string="";
  vendedor:string="";
  descripcion:string="";
  listProductos: Producto[] = [];

  carrito:Carrito[] = [];
  constructor(private aRoute:ActivatedRoute,
            private _productoService: ProductoService,
            private toastr: ToastrService,
            private fb:FormBuilder,
            private router: Router) {

    this.productoForm = this.fb.group({
      nombre: ['',Validators.required],
      precio: ['',Validators.required],
      img: ['',Validators.required]
    })    
    this.id=this.aRoute.snapshot.paramMap.get('idProducto');
  }

  ngOnInit(): void {
    this.getIdEmpresa()
    this.obtenerProducto();
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

  idEmpresa!: string
  getIdEmpresa() {
    this.idEmpresa = this.aRoute.snapshot.paramMap.get('idEmpresa')!;
    console.log(this.idEmpresa)
  }
  obtenerProducto(){
    console.log("idProducto",this.id)
    if(this.id!==null){
      this._productoService.buscarProducto(this.id).subscribe(data=>{
        this.id = data._id;
       this.nombre =data.nombre;
       this.img= data.img;
       this.precio = data.precio;
       this.descripcion = data.descripcion;
       this.vendedor = data.vendedor;
      })
    }
  }

  carritoCompras(){
    if(this.id!==null){
      this._productoService.buscarProducto(this.id).subscribe(data=>{
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
