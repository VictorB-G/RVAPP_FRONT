import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Reserva } from 'src/app/models/reserva.model';
import { ReservaService } from 'src/app/services/reserva.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.scss'
})
export class MisReservasComponent {

  messages: Message[] = [];
  paginaActual: number = 0;
  primerRegistro: number = 0;
  itemsPorPagina: number = 10;
  registrosTotales: number = 0;
  sortField: string = 'id';
  sortOrder: string = 'desc';
  reservas: Reserva[] = [];

  constructor(
    private readonly uiSpinnerService: UiSpinnerService,
    private readonly reservasService: ReservaService,
    private readonly router: Router,
  ) {
  }

  refreshReservas(event: any) {
    this.itemsPorPagina = event != null ? event.rows : this.itemsPorPagina;
    this.primerRegistro = event != null ? event.first : this.primerRegistro;
    this.paginaActual = event != null ? event.first / event.rows : this.paginaActual;
    this.sortField = event != null ? (event.sortField ? event.sortField : 'id') : this.sortField;
    this.sortOrder = event != null ? (event.sortOrder == 1 ? 'asc' : 'desc') : this.sortOrder;
    this.uiSpinnerService.showSpinner();
    this.reservasService.getMisReservas(this.paginaActual, this.itemsPorPagina, this.sortField , this.sortOrder)
    .then((response) => {
      this.reservas = response.content;
      this.registrosTotales = response.paginacionDto.total;
    }).catch((error) => {
     console.error(error);
    }).finally(() => {
      this.uiSpinnerService.hideSpinner();
    });
  }

  deleteReserva(reserva: Reserva) {
    this.uiSpinnerService.showSpinner('Eliminando reserva...');
    this.reservasService.deleteById(reserva?.id.toString())
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
      this.refreshReservas(null);
    });
  }

  timeoutMessages() {
    setTimeout(() => {
     this.messages = [];
    }, 5000);
  }

}
