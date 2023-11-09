import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService) { }
  

  ngOnInit(): void {
    
  }
  
  
  cerrarSesion(){
    console.log('dio click en cerrar sesion')
    this.toastr.success('Cierre de sesión exitoso')
    window.localStorage.removeItem('usuarioAdmin')
    this.router.navigate(['/'])
  }
}
