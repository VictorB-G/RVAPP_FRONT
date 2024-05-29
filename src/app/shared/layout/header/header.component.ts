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
  itemsDesplegable: MenuItem[] = [ {label: 'Mi perfil', icon: 'pi pi-user', command:() => {this.redirectToPerfil()} },{label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => {this.authService.logout();}}];
  subject = this.authService.loginSubject.subscribe((value) => {this.refreshHeader();});
  administracionSubItems: MenuItem[] = [{label: 'Usuarios', icon: 'pi pi-users', routerLink: '/usuarios'}, {label: 'Ciudades', icon: 'pi pi-map', routerLink: '/ciudades'},
  {label: 'Oficinas', icon: 'pi pi-building', routerLink: '/oficinas'}, {label: 'Plantas', icon: 'pi pi-users', routerLink: '/plantas'}
  ];
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
      this.headerItems.push({label: 'Administración', icon: 'pi pi-cog', items: this.administracionSubItems});
    }
    this.headerItems.push({label: 'Reservar', icon: 'pi pi-calendar', routerLink: '/reservar'});
    this.headerItems.push({label: 'Mis reservas', icon: 'pi pi-user', routerLink: '/mis-reservas'});
  }



  cargarHeaderItemsUnlogged() {
    this.headerItems = [{ label: 'Inicio', icon: 'pi pi-home', routerLink: '/' }, { label: 'Iniciar sesión', icon: 'pi pi-sign-in', routerLink: '/login' },
     { label: 'Registro', icon: 'pi pi-user-plus', routerLink: '/register' }, { label: 'Fichar', routerLink: '/fichar' }];
  }

  redirectToPerfil() {
    this.router.navigate(['/usuarios-detail-consulta', this.authService.userId]);
  }
}
