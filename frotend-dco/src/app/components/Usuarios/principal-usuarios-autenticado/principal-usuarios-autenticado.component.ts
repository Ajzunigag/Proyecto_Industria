import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Carrito } from 'src/app/models/interfaz-carrito';

@Component({
  selector: 'app-principal-usuarios-autenticado',
  templateUrl: './principal-usuarios-autenticado.component.html',
  styleUrls: ['./principal-usuarios-autenticado.component.css']
})
export class PrincipalUsuariosAutenticadoComponent implements OnInit {

  listProductos:Producto[]=[];
  carrito2:Carrito[]=[];
  constructor(private _productoService: ProductoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data=>{
      console.log(data);
      this.listProductos = data;
    },error=>{
      console.log(error);
    })
  }

  mostrarCarrito(){
    if(window.localStorage.getItem('carrito')==null){
      this.toastr.warning('Aun no agregado ningun producto a su carrito :(')
    }else{
      this.carrito2 = JSON.parse(window.localStorage.getItem('carrito')|| '{}')
      if(this.carrito2.length==0){
        this.toastr.warning('Aun no agregado ningun producto a su carrito :(')
        console.log(this.carrito2.length)
      }else{
        this.carrito2= JSON.parse(window.localStorage.getItem('carrito')|| '{}')
        this.toastr.success('Productos cargados con Exito :)')
      }
      
    }
   }

   eliminarProductoCarrito(id:any){
      this.carrito2= JSON.parse(window.localStorage.getItem('carrito')|| '{}')
      let eliminarAux=id-1;
      this.carrito2.splice(eliminarAux, 1);
      console.log(id);
      window.localStorage.setItem('carrito',JSON.stringify(this.carrito2));
      console.log(this.carrito2)
      this.toastr.warning('Se elimino de su carrito el producto con exito')
    
   }
  }

