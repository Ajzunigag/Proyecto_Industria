import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-admin-detalles-plan',
  templateUrl: './admin-detalles-plan.component.html',
  styleUrls: ['./admin-detalles-plan.component.css']
})
export class AdminDetallesPlanComponent implements OnInit {

  datosPlanNuevo = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    maxArticulos: new FormControl(0),
    estadisticas: new FormControl(''),
  });

  idPlan = '';

  datosPlan = {
    _id : '',
    nombre : '',
    descripcion : '',
    maxArticulos : '',
    estadisticas : '',
  }

  constructor(
    private route : ActivatedRoute,
    private adminServicio : AdminService,
    private toastr : ToastrService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.seguridad();
    this.getPlan();
    }

  getPlan(){
    this.idPlan = this.route.snapshot.paramMap.get('id')!;
    this.adminServicio.obtenerPlan(this.idPlan).subscribe(data => {
      if(data.acceso){
        console.log(data.plan);
        this.datosPlan = data.plan;
        this.datosPlanNuevo.get('nombre')?.setValue(data.plan.nombre);
        this.datosPlanNuevo.get('descripcion')?.setValue(data.plan.descripcion);
        this.datosPlanNuevo.get('maxArticulos')?.setValue(data.plan.maxArticulos);
        this.datosPlanNuevo.get('estadisticas')?.setValue(data.plan.estadisticas);

        if(data.plan.estadisticas==0){
          this.datosPlan.estadisticas="No"
        }else{
          this.datosPlan.estadisticas="Si"
        }
      }else{
        console.log(data.mensaje);
      }
    }, error => {
      console.log(error);
    })
  }

  editarPlan(){
    var valEstadistica
    if(this.datosPlanNuevo.value.estadisticas=="si"){
      valEstadistica=1
    }else{
      valEstadistica=0
    }
    let plan = {
      id : this.datosPlan._id,
      nombre : this.datosPlanNuevo.value.nombre,
      descripcion : this.datosPlanNuevo.value.descripcion,
      maxArticulos : this.datosPlanNuevo.value.maxArticulos,
      estadisticas : valEstadistica
    }
    this.adminServicio.actualizarPlan(plan).subscribe( data => {
      if(data.acceso){
        this.toastr.success(data.mensaje);
        this.getPlan();
      }else{
        this.toastr.error(data.mensaje);
      }
    }, error => {
      console.log(error);
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
