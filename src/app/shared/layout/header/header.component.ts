import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { LOCAL_STORAGE } from 'src/app/utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  headerItems: MenuItem[] = [];
  user: Usuario | null = null;
  isLogged: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.loginStatusChange().subscribe(loggedIn => {
      debugger
      if (this.authService.isLogged()) {
        this.isLogged = true;
        this.user = this.authService.getLoggedUser();
        this.cargarHeaderItemsLogged();
      } else {
        this.isLogged = false;
        this.cargarHeaderItemsUnlogged();
      }
    });
    //TODO: Lo del token lo hago manual provisionalmente ya que si llamo al service genera un bucle infinito 
    //TODO: Sigue pasando hay qye revisar
    let jwt = localStorage.getItem(LOCAL_STORAGE.USUARIO_TOKEN);
    if (jwt != null) {
      this.isLogged = true;
        this.user = this.authService.getLoggedUser();
        this.cargarHeaderItemsLogged();
    } else {
      this.isLogged = false;
      this.cargarHeaderItemsUnlogged();
    }
      
  }

  cargarHeaderItemsLogged() {
    this.headerItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        routerLink: '/usuarios',
        
      }
    ];
  }


  cargarHeaderItemsUnlogged() {
    this.headerItems = [
      {
        label: 'Inicio',
        routerLink: '/'
      },
      {
        label: 'Login',
        routerLink: '/login'
      },
      {
        label: 'Registro',
        routerLink: '/register'
      }
    ];
  }
}
