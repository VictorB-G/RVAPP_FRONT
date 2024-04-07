import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { PreLoginComponent } from './components/pre-login/pre-login.component';
import { AutoRegisterComponent } from './components/auto-register/auto-register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { userLoggedGuard } from './guards/user-logged.guard';

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
        path: 'inicio',
        component: InicioComponent,
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
