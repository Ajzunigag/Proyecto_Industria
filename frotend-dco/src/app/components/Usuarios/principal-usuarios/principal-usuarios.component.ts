import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-principal-usuarios',
  templateUrl: './principal-usuarios.component.html',
  styleUrls: ['./principal-usuarios.component.css']
})
export class PrincipalUsuariosComponent implements OnInit {
  listProductos:Producto[]=[];
  constructor(private _productoService: ProductoService) { }

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
}
