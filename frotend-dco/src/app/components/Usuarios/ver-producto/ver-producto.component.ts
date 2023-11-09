import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {
  id:string | null;
  productoForm:FormGroup;
  nombre:string="";
  precio:number=0;
  img:string="";
  vendedor:string="";
  descripcion:string="";
  listProductos: Producto[] = [];
  constructor(private aRoute:ActivatedRoute,
            private _productoService: ProductoService,
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
       this.nombre =data.nombre;
       this.img= data.img;
       this.precio = data.precio;
       this.descripcion = data.descripcion;
       this.vendedor = data.vendedor;
      })
    }
  }
  
}
