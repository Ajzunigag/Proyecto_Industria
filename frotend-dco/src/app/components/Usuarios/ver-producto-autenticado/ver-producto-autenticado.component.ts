import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Carrito } from 'src/app/models/interfaz-carrito';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ver-producto-autenticado',
  templateUrl: './ver-producto-autenticado.component.html',
  styleUrls: ['./ver-producto-autenticado.component.css']
})
export class VerProductoAutenticadoComponent implements OnInit {

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
            private fb:FormBuilder) {

    this.productoForm = this.fb.group({
      nombre: ['',Validators.required],
      precio: ['',Validators.required],
      img: ['',Validators.required]
    })    
    this.id=this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto(){
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


  
}
