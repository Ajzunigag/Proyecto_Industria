import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/empresa/login/login.component';
import { RegistroComponent } from './components/empresa/registro/registro.component';
import { PrincipalComponent } from './components/empresa/principal/principal.component';

import { ActualizarInfoComponent } from './components/empresa/actualizar-info/actualizar-info.component';
import { HistorialComponent } from './components/empresa/historial/historial.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { PrincipalUsuariosComponent } from './components/Usuarios/principal-usuarios/principal-usuarios.component';
import { VerProductoComponent } from './components/Usuarios/ver-producto/ver-producto.component';
import { CreacionUsuarioComponent } from './components/Usuarios/creacion-usuario/creacion-usuario.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IniciarUsuarioComponent } from './components/Usuarios/iniciar-usuario/iniciar-usuario.component';
import { PrincipalUsuariosAutenticadoComponent } from './components/Usuarios/principal-usuarios-autenticado/principal-usuarios-autenticado.component';
import { AdminLoginComponent } from './components/administracion/admin-login/admin-login.component';
import { AdminUsuariosComponent } from './components/administracion/admin-usuarios/admin-usuarios.component';
import { AdminPlanesComponent } from './components/administracion/admin-planes/admin-planes.component';
import { AdminNuevoUsuarioComponent } from './components/administracion/admin-nuevo-usuario/admin-nuevo-usuario.component';
import { AdminNuevoPlanComponent } from './components/administracion/admin-nuevo-plan/admin-nuevo-plan.component';
import { AdminNavbarComponent } from './components/administracion/admin-navbar/admin-navbar.component';
import { AdminHomeComponent } from './components/administracion/admin-home/admin-home.component';
import { AdminEmpresasComponent } from './components/administracion/admin-empresas/admin-empresas.component';
import { AdminDetallesUsuarioComponent } from './components/administracion/admin-detalles-usuario/admin-detalles-usuario.component';
import { AdminDetallesPlanComponent } from './components/administracion/admin-detalles-plan/admin-detalles-plan.component';
import { AdminDetallesEmpresaComponent } from './components/administracion/admin-detalles-empresa/admin-detalles-empresa.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CreacionProductoComponent } from './components/empresa/creacion-producto/creacion-producto.component';
import { CategoriasComponent } from './components/empresa/categorias/categorias.component';

import { ProductosComponent } from './components/empresa/productos/productos.component';
import { VerProductosComponent } from './components/empresa/ver-productos/ver-productos.component';
import { DetalleProductoComponent } from './components/empresa/detalle-producto/detalle-producto.component';
import { PlanesComponent } from './components/planes/planes.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';

import { VerProductoAutenticadoComponent } from './components/Usuarios/ver-producto-autenticado/ver-producto-autenticado.component';
import { RealizarCompraComponent } from './components/Usuarios/realizar-compra/realizar-compra.component';
import { PaginaCreacionComponent } from './components/Usuarios/pagina-creacion/pagina-creacion.component';
import { PipePipe } from './pipes/pipe.pipe';


import { PaginaVerCreacionComponent } from './components/Usuarios/pagina-ver-creacion/pagina-ver-creacion.component';


import { GaleriaProductosComponent } from './components/galeria-productos/galeria-productos.component';
import { DetalleProductosComponent } from './components/detalle-productos/detalle-productos.component';

import { PaginaVerCreacionDosComponent } from './components/Usuarios/pagina-ver-creacion-dos/pagina-ver-creacion-dos.component';
import { PaginaVerCreacionTresComponent } from './components/Usuarios/pagina-ver-creacion-tres/pagina-ver-creacion-tres.component';
import { VentasXprodComponent } from './components/empresa/estadisticas/ventas-xprod/ventas-xprod.component';
import { VentasXcatComponent } from './components/empresa/estadisticas/ventas-xcat/ventas-xcat.component';
import { GananciasXcatComponent } from './components/empresa/estadisticas/ganancias-xcat/ganancias-xcat.component';
import { Top10VendidosComponent } from './components/empresa/estadisticas/top10-vendidos/top10-vendidos.component';
import { PrincipalEstComponent } from './components/empresa/estadisticas/principal/principal.component';

import { NgChartsModule } from 'ng2-charts';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    ActualizarInfoComponent,
    HistorialComponent,
    PrincipalUsuariosComponent,
    VerProductoComponent,
    CreacionUsuarioComponent,
    IniciarUsuarioComponent,
    PrincipalUsuariosAutenticadoComponent,
    AdminLoginComponent,
    AdminUsuariosComponent,
    AdminPlanesComponent,
    AdminNuevoUsuarioComponent,
    AdminNuevoPlanComponent,
    AdminNavbarComponent,
    AdminHomeComponent,
    AdminEmpresasComponent,
    AdminDetallesUsuarioComponent,
    AdminDetallesPlanComponent,
    AdminDetallesEmpresaComponent,
    LandingPageComponent,
    CreacionProductoComponent,
    CategoriasComponent,
    ProductosComponent,
    VerProductosComponent,
    DetalleProductoComponent,
    PlanesComponent,
    TiendasComponent,
    VerProductoAutenticadoComponent,
    RealizarCompraComponent,
    PaginaCreacionComponent,
    PipePipe,
    PaginaVerCreacionComponent,
    GaleriaProductosComponent,
    DetalleProductosComponent,
    PaginaVerCreacionDosComponent,
    PaginaVerCreacionTresComponent,
    VentasXprodComponent,
    VentasXcatComponent,
    GananciasXcatComponent,
    Top10VendidosComponent,
    PrincipalEstComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
