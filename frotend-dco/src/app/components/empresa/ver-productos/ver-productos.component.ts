import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { empresaService } from 'src/app/services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductosComponent implements OnInit {

  constructor(private empresaServicio: empresaService, private toastr: ToastrService,  private router: Router,) { }

  ngOnInit(): void {
    if(this.seguridad()) this.obtenerProductos();
  }
  seguridad() {
    let valido=true
    if (!window.localStorage.getItem('empresa')) {
      this.router.navigate(['/'])
      this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina')
      valido=false
    } else {
      this.empresaServicio.seguridad(window.localStorage.getItem('empresa')!).subscribe((res) => {
        if (res == null) {
          this.router.navigate(['/'])
          this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina','ERROR')
          window.localStorage.removeItem('empresa')
    window.localStorage.removeItem('usuario')
    window.localStorage.removeItem('usuarioAdmin')
    window.localStorage.removeItem('carrito')
          valido=false
        }
      })
    }
    return valido
  }
  listProductos: Producto[] = [];
  obtenerProductos() {
    this.empresaServicio.getProductos(window.localStorage.getItem('empresa')!).subscribe(res => {
      console.log(res);
      this.listProductos = res;
      
      if(this.listProductos.length==0){
        this.toastr.error('No hay ningun producto en la lista','AVISO')
      }
    }, error => {
      console.log(error);
    })
  }
  cerrarSesion(){
    
    this.toastr.success('Cierre de sesión exitoso')
    window.localStorage.removeItem('empresa')
    window.localStorage.removeItem('usuario')
    window.localStorage.removeItem('usuarioAdmin')
    window.localStorage.removeItem('carrito')
    this.router.navigate(['/'])
    
  }
}
