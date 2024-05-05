import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Planta } from 'src/app/models/planta.model';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.scss'
})
export class PlantasComponent {

  oficinas!: any[];
  ciudades!: any[];
  plantas!: any[];
  messages: Message[] = [];
  paginaActual: number = 0;
  primerRegistro: number = 0;
  itemsPorPagina: number = 10;
  registrosTotales: number = 0;
  sortField: string = 'id';
  sortOrder: string = 'desc';
  filtro: any = {
    id: '',
    idCiudad: ' ',
    idOficina: ' ',
    nombre: '',
    numPlanta: ''
  };

  constructor(
    private readonly uiSpinnerService: UiSpinnerService,
    private readonly masterdataService: MasterdataService,
    private readonly plantasService: PlantasService,
    private readonly router: Router,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {severity: string, summary: string, detail: string};
    if (state != null) {
      this.messages = [{ severity: state.severity, summary: state.summary, detail: state.detail}];
      this.timeoutMessages();
    }
  }

  ngOnInit() {
    this.cargarCombos();
  }

  cargarCombos() {
    this.masterdataService.getCiudades()
    .then((response) => {
      this.ciudades = response;
      this.ciudades.unshift({id: ' ', nombre: 'Todas'});
      this.obtenerOficinas();
    }).catch((error) => {
      console.error(error);
    })
    .finally(() => {
    });
  }

  obtenerOficinas() {
    if (this.filtro.idCiudad === ' ') {
      this.oficinas = [{id: ' ', nombre: 'Todas'}];
      this.filtro.idOficina = ' ';
      return;
    }
    this.masterdataService.getOficinasByIdCiudad(this.filtro.idCiudad)
    .then((response) => {
      this.oficinas = response;
      this.oficinas.unshift({id: ' ', nombre: 'Todas'});
    }).catch((error) => {
      console.error(error);
    })
    .finally(() => {
    });
  }

  precargarFiltro(filtrar:boolean) {
    this.filtro = {
      id: '',
      idCiudad: ' ',
      idOficina: ' ',
      nombre: '',
      numPlanta: ''
    };
    if (filtrar) {
      this.refreshPlantas(null);
    }
  }

  refreshPlantas(event: any) {
    this.itemsPorPagina = event != null ? event.rows : this.itemsPorPagina;
    this.primerRegistro = event != null ? event.first : this.primerRegistro;
    this.paginaActual = event != null ? event.first / event.rows : this.paginaActual;
    this.sortField = event != null ? (event.sortField ? event.sortField : 'id') : this.sortField;
    this.sortOrder = event != null ? (event.sortOrder == 1 ? 'asc' : 'desc') : this.sortOrder;
    this.uiSpinnerService.showSpinner();
    this.plantasService.filterPlantas(this.filtro.id, this.filtro.idCiudad, this.filtro.idOficina, this.filtro.nombre, this.filtro.numPlanta, this.paginaActual, this.itemsPorPagina, this.sortField , this.sortOrder)
    .then((response) => {
      this.plantas = response.content;
      this.registrosTotales = response.paginacionDto.total;
    }).catch((error) => {
     console.error(error);
    }).finally(() => {
      this.uiSpinnerService.hideSpinner();
    });
  }

  deletePlanta(planta: Planta) {
    this.uiSpinnerService.showSpinner('Eliminando planta...');
    this.plantasService.deleteById(planta?.id.toString())
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
      this.refreshPlantas(null);
    });
  }

  anyadirPlantas() {
    this.router.navigate(['/plantas-detail']);
  }

  editarPlanta(planta: Planta) {
    this.router.navigate(['/plantas-detail/', planta.id]);
  }

  timeoutMessages() {
    setTimeout(() => {
     this.messages = [];
    }, 5000);
  }

}
