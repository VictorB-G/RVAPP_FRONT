import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { PreLoginComponent } from './components/pre-login/pre-login.component';
import { AutoRegisterComponent } from './components/auto-register/auto-register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { userLoggedGuard } from './guards/user-logged.guard';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { userAdminGuard} from './guards/user-admin.guard';
import { FicharComponent } from './components/fichar/fichar.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { OficinasComponent } from './components/oficinas/oficinas.component';
import { PlantasComponent } from './components/plantas/plantas.component';
import { UsuariosDetailComponent } from './components/usuarios/usuarios-detail/usuarios-detail.component';
import { CiudadesDetailComponent } from './components/ciudades/ciudades-detail/ciudades-detail.component';
import { OficinasDetailComponent } from './components/oficinas/oficinas-detail/oficinas-detail.component';
import { PlantasDetailComponent } from './components/plantas/plantas-detail/plantas-detail.component';
import { ReservarComponent } from './components/reservar/reservar.component';
import { MisReservasComponent } from './components/mis-reservas/mis-reservas.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: PreLoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: AutoRegisterComponent
      },
      {
        path: 'fichar',
        component: FicharComponent
      },
      {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [userLoggedGuard]
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'usuarios-detail',
        component: UsuariosDetailComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'usuarios-detail/:id',
        component: UsuariosDetailComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'usuarios-detail-consulta/:id',
        component: UsuariosDetailComponent,
        canActivate: [userLoggedGuard]
      },
      {
        path: 'ciudades',
        component: CiudadesComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'ciudades-detail',
        component: CiudadesDetailComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'ciudades-detail/:id',
        component: CiudadesDetailComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'oficinas',
        component: OficinasComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'oficinas-detail',
        component: OficinasDetailComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'oficinas-detail/:id',
        component: OficinasDetailComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'plantas',
        component: PlantasComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'plantas-detail',
        component: PlantasDetailComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'plantas-detail/:id',
        component: PlantasDetailComponent,
        canActivate: [userLoggedGuard, userAdminGuard]
      },
      {
        path: 'reservar',
        component: ReservarComponent,
        canActivate: [userLoggedGuard]
      },
      {
        path: 'mis-reservas',
        component: MisReservasComponent,
        canActivate: [userLoggedGuard]
      },
      //RUTA POR DEFECTO A LA QUE ENVIAR SI NO EXISTE
      {
        path: '**',
        redirectTo: 'inicio',
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
