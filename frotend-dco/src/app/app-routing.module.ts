import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActualizarInfoComponent } from './components/empresa/actualizar-info/actualizar-info.component'
import { HistorialComponent } from './components/empresa/historial/historial.component';
import { LoginComponent } from './components/empresa/login/login.component'

import { PrincipalComponent } from './components/empresa/principal/principal.component'
import { RegistroComponent } from './components/empresa/registro/registro.component'
import { CreacionUsuarioComponent } from './components/Usuarios/creacion-usuario/creacion-usuario.component';
import { IniciarUsuarioComponent } from './components/Usuarios/iniciar-usuario/iniciar-usuario.component';
import { PrincipalUsuariosAutenticadoComponent } from './components/Usuarios/principal-usuarios-autenticado/principal-usuarios-autenticado.component';
import { PrincipalUsuariosComponent } from './components/Usuarios/principal-usuarios/principal-usuarios.component';
import { VerProductoComponent } from './components/Usuarios/ver-producto/ver-producto.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AdminLoginComponent } from './components/administracion/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/administracion/admin-home/admin-home.component';
import { AdminEmpresasComponent } from './components/administracion/admin-empresas/admin-empresas.component';
import { AdminUsuariosComponent } from './components/administracion/admin-usuarios/admin-usuarios.component';
import { AdminPlanesComponent } from './components/administracion/admin-planes/admin-planes.component';
import { AdminDetallesUsuarioComponent } from './components/administracion/admin-detalles-usuario/admin-detalles-usuario.component';
import { AdminDetallesEmpresaComponent } from './components/administracion/admin-detalles-empresa/admin-detalles-empresa.component';
import { AdminDetallesPlanComponent } from './components/administracion/admin-detalles-plan/admin-detalles-plan.component';
import { AdminNuevoUsuarioComponent } from './components/administracion/admin-nuevo-usuario/admin-nuevo-usuario.component';
import { AdminNuevoPlanComponent } from './components/administracion/admin-nuevo-plan/admin-nuevo-plan.component';
import { ProductosComponent } from './components/empresa/productos/productos.component';
import { VerProductosComponent } from './components/empresa/ver-productos/ver-productos.component';
import { DetalleProductoComponent } from './components/empresa/detalle-producto/detalle-producto.component';
import { CategoriasComponent } from './components/empresa/categorias/categorias.component';
import { CreacionProductoComponent } from './components/empresa/creacion-producto/creacion-producto.component';
import { PlanesComponent } from './components/planes/planes.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { VerProductoAutenticadoComponent } from './components/Usuarios/ver-producto-autenticado/ver-producto-autenticado.component';

import { PaginaCreacionComponent } from './components/Usuarios/pagina-creacion/pagina-creacion.component';

import { PaginaVerCreacionComponent } from './components/Usuarios/pagina-ver-creacion/pagina-ver-creacion.component';

import { GananciasXcatComponent } from './components/empresa/estadisticas/ganancias-xcat/ganancias-xcat.component';
import { PrincipalEstComponent } from './components/empresa/estadisticas/principal/principal.component';
import { Top10VendidosComponent } from './components/empresa/estadisticas/top10-vendidos/top10-vendidos.component';
import { VentasXcatComponent } from './components/empresa/estadisticas/ventas-xcat/ventas-xcat.component';
import { VentasXprodComponent } from './components/empresa/estadisticas/ventas-xprod/ventas-xprod.component';


import { PaginaVerCreacionDosComponent } from './components/Usuarios/pagina-ver-creacion-dos/pagina-ver-creacion-dos.component';
import { PaginaVerCreacionTresComponent } from './components/Usuarios/pagina-ver-creacion-tres/pagina-ver-creacion-tres.component';
import { GaleriaProductosComponent } from './components/galeria-productos/galeria-productos.component';




const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'empresa/actualizarInfo', component: ActualizarInfoComponent },
  { path: 'empresa/historial', component: HistorialComponent },
  { path: 'empresa/login', component: LoginComponent },
  { path: 'empresa/principal', component: PrincipalComponent },
  { path: 'empresa/registro', component: RegistroComponent },
  { path: 'usuarios', component: PrincipalUsuariosComponent },
  { path: 'usuarios/verProducto/:id', component: VerProductoComponent },
  { path: 'usuarios/crearUsuario', component: CreacionUsuarioComponent },
  { path: 'usuarios/inicioUsuario', component: IniciarUsuarioComponent },
  { path: 'usuarios/usaurio/inicio', component: PrincipalUsuariosAutenticadoComponent },
  { path: '', component: LandingPageComponent },
  { path: 'empresa/categorias', component: CategoriasComponent },
  { path: 'usuarios/usaurio/producto', component: CreacionProductoComponent },
  { path: 'usuarios/ver-producto/:id', component: VerProductoAutenticadoComponent },
  { path: 'usuarios/pago/realizar-compra', component: PaginaVerCreacionTresComponent },
  { path: 'usuarios/crearPagina', component: PaginaCreacionComponent },
  { path: 'usuarios/verPagina', component: PaginaVerCreacionComponent },
  { path: 'usuarios/verPagina2/:id', component: PaginaVerCreacionDosComponent },
  { path: 'usuarios/verPagina3/compra', component: PaginaVerCreacionTresComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/empresas', component: AdminEmpresasComponent },
  { path: 'admin/usuarios', component: AdminUsuariosComponent },
  { path: 'admin/planes', component: AdminPlanesComponent },
  { path: 'admin/usuario/:id', component: AdminDetallesUsuarioComponent },
  { path: 'admin/empresa/:id', component: AdminDetallesEmpresaComponent },
  { path: 'admin/plan/:id', component: AdminDetallesPlanComponent },
  { path: 'admin/nuevoUsuario', component: AdminNuevoUsuarioComponent },
  { path: 'admin/nuevoPlan', component: AdminNuevoPlanComponent },
  { path: 'empresa/Productos', component: ProductosComponent },
  { path: 'empresa/VerProductos', component: VerProductosComponent },
  { path: 'empresa/detalleProducto/:id', component: DetalleProductoComponent },
  { path: 'empresa/categorias', component: CategoriasComponent },
  { path: 'empresa/agregarProducto', component: CreacionProductoComponent },
  { path: 'Planes', component: PlanesComponent },
  { path: 'Tiendas', component: TiendasComponent },
  { path: 'empresa/:idEmpresa/galeriaProductos', component: GaleriaProductosComponent },
  { path: 'empresa/:idEmpresa/producto/:idProducto', component: PaginaVerCreacionDosComponent },
  { path: 'empresa/GananciasXcat', component: GananciasXcatComponent },
  { path: 'empresa/PrincipalEst', component: PrincipalEstComponent },
  { path: 'empresa/Top10Vendidos', component: Top10VendidosComponent },
  { path: 'empresa/VentasXcat', component: VentasXcatComponent },
  { path: 'empresa/VentasXprod', component: VentasXprodComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
