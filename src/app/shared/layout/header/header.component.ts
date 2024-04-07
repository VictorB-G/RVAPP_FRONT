import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  headerItems: MenuItem[] = [];
  isLoggedIn: boolean = false;
  user: Usuario | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.loginStatusChange().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.user = this.authService.getLoggedUser();
        this.cargarHeaderItemsLogged();
      } else {
        this.cargarHeaderItemsUnlogged();
      }
    });
    if (this.isLoggedIn) {
      this.user = this.authService.getLoggedUser();
      this.cargarHeaderItemsLogged();
    } else {
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
        visible: this.authService.isAdmin
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
