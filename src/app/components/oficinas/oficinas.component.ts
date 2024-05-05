import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Oficina } from 'src/app/models/oficina.model';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { OficinasService } from 'src/app/services/oficinas.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';

@Component({
  selector: 'app-oficinas',
  templateUrl: './oficinas.component.html',
  styleUrl: './oficinas.component.scss'
})
export class OficinasComponent {

  oficinas!: any[];
  ciudades!: any[];
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
    nombre: '',
    direccion: ''
  };

  constructor(
    private readonly uiSpinnerService: UiSpinnerService,
    private readonly oficinasService: OficinasService,
    private readonly masterdataService: MasterdataService,
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
      nombre: '',
      direccion: ''
    };
    if (filtrar) {
      this.refreshOficinas(null);
    }
  }

  refreshOficinas(event: any) {
    this.itemsPorPagina = event != null ? event.rows : this.itemsPorPagina;
    this.primerRegistro = event != null ? event.first : this.primerRegistro;
    this.paginaActual = event != null ? event.first / event.rows : this.paginaActual;
    this.sortField = event != null ? (event.sortField ? event.sortField : 'id') : this.sortField;
    this.sortOrder = event != null ? (event.sortOrder == 1 ? 'asc' : 'desc') : this.sortOrder;
    this.uiSpinnerService.showSpinner();
    this.oficinasService.filterOficinas(this.filtro.id, this.filtro.idCiudad, this.filtro.nombre, this.filtro.direccion, this.paginaActual, this.itemsPorPagina,this.sortField , this.sortOrder)
    .then((response) => {
      this.oficinas = response.content;
      this.registrosTotales = response.paginacionDto.total;
    }).catch((error) => {
     console.error(error);
    }).finally(() => {
      this.uiSpinnerService.hideSpinner();
    });
  }

  deleteOficina(oficina: Oficina) {
    this.uiSpinnerService.showSpinner('Eliminando oficina...');
    this.oficinasService.deleteById(oficina?.id.toString())
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
      this.refreshOficinas(null);
    });
  }

  anyadirOficinas() {
    this.router.navigate(['/oficinas-detail']);
  }

  editarOficina(oficina: any) {
    this.router.navigate(['/oficinas-detail/' + oficina.id]);
  }

  timeoutMessages() {
    setTimeout(() => {
     this.messages = [];
    }, 5000);
  }
}
