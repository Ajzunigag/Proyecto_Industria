import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Plan } from 'src/app/models/plan.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-nuevo-plan',
  templateUrl: './admin-nuevo-plan.component.html',
  styleUrls: ['./admin-nuevo-plan.component.css']
})
export class AdminNuevoPlanComponent implements OnInit {

  formularioPlan = new FormGroup({
    nombre: new FormControl(''),
    desc: new FormControl(''),
    maxA: new FormControl(0),
    estadisticas: new FormControl(''),
    
  });

constructor(
    private router : Router,
    private adminServicio : AdminService,
    private toastr : ToastrService
  ) { }


  ngOnInit(): void {
    this.seguridad()
  }

  nuevoPlan(){
    var valEstadistica
    if(this.formularioPlan.value.estadisticas=="si"){
      valEstadistica=1
    }else if(this.formularioPlan.value.estadisticas=="no"){
      valEstadistica=0
    }else{
      valEstadistica=0
    }
    const PLAN : Plan = {
      nombre : this.formularioPlan.value.nombre!,
      descripcion : this.formularioPlan.value.desc!,
      maxArticulos : this.formularioPlan.value.maxA!,
      estadisticas : valEstadistica
    }
    console.log(PLAN);
    this.adminServicio.nuevoPlan(PLAN).subscribe(data=>{
      console.log(data.mensaje);
      this.toastr.success('El plan fue registrado con exito', 'Plan Registrado');
      this.router.navigate(['admin/planes'])
    }, error=>{
      console.log(error);
      this.formularioPlan.reset();
    });
  }


  seguridad() {
    if (!window.localStorage.getItem('usuarioAdmin')) {
      this.router.navigate(['/'])
      this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina')
    } else {
      this.adminServicio.seguridad(window.localStorage.getItem('usuarioAdmin')!).subscribe((res) => {
        if (res.name != "CastError") {
          if (res == false) {
            this.router.navigate(['/'])
            this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina')
          }
        } else {
          this.router.navigate(['/'])
          this.toastr.error('Necesita ingresar con una cuenta verificada para ingresar a esa pagina')
        }

      })
    }
  }
}
