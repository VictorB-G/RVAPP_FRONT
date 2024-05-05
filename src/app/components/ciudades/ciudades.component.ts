import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Ciudad } from 'src/app/models/ciudad.model';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrl: './ciudades.component.scss'
})
export class CiudadesComponent {

  ciudades!: any[];
  ciudadSeleccionada!: any;
  messages: Message[] = [];
  paginaActual: number = 0;
  primerRegistro: number = 0;
  itemsPorPagina: number = 10;
  registrosTotales: number = 0;
  sortField: string = 'id';
  sortOrder: string = 'desc';
  filtro: any = {
    id: '',
    nombre: '',
    codigo: ''
  };

  constructor(
    private readonly uiSpinnerService: UiSpinnerService,
    private readonly ciudadesService: CiudadesService,
    private readonly router: Router,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {severity: string, summary: string, detail: string};
    if (state != null) {
      this.messages = [{ severity: state.severity, summary: state.summary, detail: state.detail}];
      this.timeoutMessages();
    }
  }

  precargarFiltro(filtrar:boolean) {
    this.filtro = {
      id: '',
      nombre: '',
      codigo: ''
    };
    if (filtrar) {
      this.refreshCiudades(null);
    }
  }

  refreshCiudades(event: any) {
    this.itemsPorPagina = event != null ? event.rows : this.itemsPorPagina;
    this.primerRegistro = event != null ? event.first : this.primerRegistro;
    this.paginaActual = event != null ? event.first / event.rows : this.paginaActual;
    this.sortField = event != null ? (event.sortField ? event.sortField : 'id') : this.sortField;
    this.sortOrder = event != null ? (event.sortOrder == 1 ? 'asc' : 'desc') : this.sortOrder;
    this.uiSpinnerService.showSpinner();
    this.ciudadesService.filterCiudades(this.filtro.id, this.filtro.nombre, this.filtro.codigo, this.paginaActual, this.itemsPorPagina,this.sortField , this.sortOrder)
    .then((response) => {
      this.ciudades = response.content;
      this.registrosTotales = response.paginacionDto.total;
    }).catch((error) => {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al cargar el listado de ciudades' }];
    }).finally(() => {
      this.uiSpinnerService.hideSpinner();
    });
  }

  anyadirCiudad() {
    this.router.navigate(['/ciudades-detail']);
  }

  editarCiudad(ciudad: Ciudad) {
    this.router.navigate(['/ciudades-detail/' + ciudad.id]);
  }

  deleteCiudad(ciudad: Ciudad) {
    this.uiSpinnerService.showSpinner('Eliminando ciudad...');
    this.ciudadesService.deleteById(ciudad?.id.toString())
    .then((response) => {
      if (response.success) {
        this.messages = [{ severity: 'success', summary: 'Operación realizada', detail: response.message}]; 
      } else {
        this.messages = [{ severity: 'error', summary: 'Error', detail: response.error}];
      }
      this.timeoutMessages();
    }).catch((error) => {
      this.messages = [{ severity: 'error', summary: 'Error', detail: error.error}];
      this.timeoutMessages();
    }).finally(() => {
      this.uiSpinnerService.hideSpinner();
      this.refreshCiudades(null);
    });
  }

  timeoutMessages() {
    setTimeout(() => {
     this.messages = [];
    }, 5000);
  }

}
