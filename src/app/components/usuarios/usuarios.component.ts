import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Rol } from 'src/app/models/rol.model';
import { Usuario, UsuarioAlta } from 'src/app/models/usuario.model';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  usuarios!: Usuario[];
  roles: Rol[] = [];
  activos: any[] = [{label: 'Todos', value: ' ', selected: true}, {label: 'Sí', value: "true"}, {label: 'No', value: "false"}];
  paginaActual: number = 0;
  primerRegistro: number = 0;
  itemsPorPagina: number = 10;
  registrosTotales: number = 0;
  sortField: string = 'nif';
  sortOrder: string = 'desc';
  filtro: any;
  messages: Message[] = [];

  constructor(
    private readonly uiSpinnerService: UiSpinnerService,
    private readonly userService: UserService,
    private readonly masterdataService: MasterdataService,
    private readonly router: Router,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {severity: string, summary: string, detail: string};
    if (state != null) {
      this.messages = [{ severity: state.severity, summary: state.summary, detail: state.detail}];
      setTimeout(() => {
        this.messages = [];
      }, 5000);
    }
  }

  ngOnInit() {
    this.cargarCombos();
    this.precargarFiltro(false);
  }

  cargarCombos() {
    this.masterdataService.getRoles()
    .then((response) => {
      this.roles = response;
      this.roles.unshift({id: 0, codRol: ' ', descripcion: 'Todos'});
    }).catch((error) => {
      console.error(error);
    })
    .finally(() => {
    });
  }

  precargarFiltro(filtrar:boolean) {
    this.filtro = {
      nif: '',
      nombre: '',
      apellido1: '',
      email: '',
      activo: ' ',
      rol: ' '
    };
    if (filtrar) {
      this.refreshUsuarios(null);
    }
  }

  refreshUsuarios(event: any) {
    this.itemsPorPagina = event != null ? event.rows : this.itemsPorPagina;
    this.primerRegistro = event != null ? event.first : this.primerRegistro;
    this.paginaActual = event != null ? event.first / event.rows : this.paginaActual;
    this.sortField = event != null ? (event.sortField ? event.sortField : 'nif') : this.sortField;
    this.sortOrder = event != null ? (event.sortOrder == 1 ? 'asc' : 'desc') : this.sortOrder;
    this.uiSpinnerService.showSpinner();
    this.userService.filterUsers(this.filtro.nif, this.filtro.rol, this.filtro.email, this.filtro.nombre,
      this.filtro.apellido1, this.filtro.activo, this.paginaActual, this.itemsPorPagina,this.sortField , this.sortOrder)
    .then((response) => {
      this.usuarios = response.content;
      this.registrosTotales = response.paginacionDto.total;
    }).catch((error) => {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al cargar el listado de usuarios' }];
    }).finally(() => {
      this.uiSpinnerService.hideSpinner();
    });
  }

  anyadirUsuario() {
    this.router.navigate(['/usuarios-detail']);
  }

  editarUsuario(usuario: Usuario) {
    this.router.navigate(['/usuarios-detail/', usuario.id]);

  }

}
