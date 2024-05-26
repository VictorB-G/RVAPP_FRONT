import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { MasterdataPublicService } from 'src/app/services/masterdata-public.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';

@Component({
  selector: 'app-fichar',
  templateUrl: './fichar.component.html',
  styleUrl: './fichar.component.scss'
})
export class FicharComponent {
  nif: string = '';
  aceptado: boolean = false;
  messages: Message[] = [];

  constructor(
    private router: Router,
    private readonly masterdataPublicService: MasterdataPublicService,
    private readonly uiSpinnerService: UiSpinnerService
  ){
  }

  ngOnInit() {
  }

  fichar() {
    debugger
    if (!this.aceptado) {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Debes aceptar el tratamiento de tus datos personales' }];
      return;
    }
    if (this.nif != null && this.nif != '') {
      this.uiSpinnerService.showSpinner();
      this.masterdataPublicService.fichar(this.nif)
        .then((response) => {
          if (response) {
            this.messages = [{ severity: 'success', summary: 'Fichaje', detail: 'Fichaje realizado correctamente' }];
          } else {
            this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al realizar el fichaje' }];
          }
        }).catch((error) => {
          this.messages = [{ severity: 'error', summary: 'Error', detail: error }];
        }).finally(() => {
          this.uiSpinnerService.hideSpinner();
        });
    } else {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'El nif no puede estar vacio' }];
    }
  }

}
