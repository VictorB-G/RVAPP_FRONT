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
  user: Usuario | null = null;
  isLogged: boolean = false;
  itemsDesplegable: MenuItem[] = [{label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => {this.authService.logout();}}];
  subject = this.authService.loginSubject.subscribe((value) => {this.refreshHeader();});

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  async refreshHeader() {
    await this.authService.getLoggedUser()
      .then((user) => {
        this.user = user;
        this.authService.usuarioActual = user;
      })
      .catch((error) => {this.user = null;})
    if(this.authService.isLogged()) {
      console.log(this.user);
      this.cargarHeaderItemsLogged();
      this.isLogged = true;
    } else {
      this.cargarHeaderItemsUnlogged();
      this.isLogged = false;
    }
  }  

  cargarHeaderItemsLogged() {
    this.headerItems = [{ label: 'Inicio', icon: 'pi pi-home', routerLink: '/inicio' }];
    if (this.authService.isAdmin) {
      this.headerItems.push({label: 'Administración', icon: 'pi pi-cog', routerLink: '/admin'});
    }
  }


  cargarHeaderItemsUnlogged() {
    this.headerItems = [{ label: 'Inicio', routerLink: '/' }, { label: 'Iniciar sesión', routerLink: '/login' }, { label: 'Registro', routerLink: '/register' }];
  }
}
