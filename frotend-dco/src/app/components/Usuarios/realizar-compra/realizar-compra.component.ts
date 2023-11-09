import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Carrito } from 'src/app/models/interfaz-carrito';
import { Calculos } from 'src/app/models/interfaz-calculos';
import { empresaService } from 'src/app/services/empresa.service';
@Component({
  selector: 'app-realizar-compra',
  templateUrl: './realizar-compra.component.html',
  styleUrls: ['./realizar-compra.component.css']
})
export class RealizarCompraComponent implements OnInit {

  compraForm: FormGroup;
  carrito: Carrito[] = [];
  cantidadProductos: number = 0;
  subTotal: number = 0;
  Total: number = 0;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _usuarioServicio: UsuarioService,
    private empresaServicio: empresaService) {
    this.compraForm = this.fb.group({
      nombre: ['', Validators.required],
      numero: ['', [Validators.required]],
      fechaExp: ['', Validators.required],
      cvc: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.cargarCarrito();
    this.calcularInfo()
  }

  cargarCarrito() {
    if (window.localStorage.getItem('carrito') == null) {

    } else {
      this.carrito = JSON.parse(window.localStorage.getItem('carrito') || '{}')
      if (this.carrito.length == 0) {
        this.toastr.warning('Aun no agregado ningun producto a su carrito :(')
        console.log(this.carrito.length)
      } else {
        this.carrito = JSON.parse(window.localStorage.getItem('carrito') || '{}')
        this.toastr.success('Productos cargados con Exito :)')
      }
    }
  }

  calcularInfo() {
    if (window.localStorage.getItem('carrito') == null) {
      this.toastr.warning('Aun no agregado ningun producto a su carrito :(')
    } else {
      this.carrito = JSON.parse(window.localStorage.getItem('carrito') || '{}')
      if (this.carrito.length == 0) {
        this.toastr.warning('Aun no agregado ningun producto a su carrito :(')
        console.log(this.carrito.length)
      } else {
        let subtotal = 0;
        let subtotalAux = 0;
        let cantidad = 0;
        this.carrito.forEach(e => {
          subtotal = e.precio || 0 + subtotal
          subtotalAux = subtotal + subtotalAux
          cantidad = cantidad + 1;
        })
        let total = subtotalAux * 0.14 + subtotalAux;
        this.cantidadProductos = cantidad;
        this.subTotal = subtotalAux;
        this.Total = total;
      }
    }
  }

  comprar() {
    if (window.localStorage.getItem('carrito') == null) {
      this.toastr.warning('Aun no agregado ningun producto a su carrito :(')
    } else {
      this.carrito.forEach(element => {
        let venta = {
          nombre: element.nombre,
          precio: element.precio,
          idProducto: element.idProducto,
          idComprador: window.localStorage.getItem('usuario')
        }
        this.empresaServicio.venta(venta).subscribe((res) => {
          console.log(res)
        })
      });


      this.carrito = [];
      window.localStorage.setItem('carrito', JSON.stringify(this.carrito));
      this.router.navigate(['/usuarios/usaurio/inicio'])
      this.toastr.info('Se ha realizado con exito su compra gracias por preferirnos :)')
    }
  }

}
