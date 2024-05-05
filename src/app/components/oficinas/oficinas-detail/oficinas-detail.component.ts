import { Component, Sanitizer, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Ciudad } from 'src/app/models/ciudad.model';
import { Oficina } from 'src/app/models/oficina.model';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { OficinasService } from 'src/app/services/oficinas.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';
import { FormsValidation } from 'src/app/services/validators/forms.validator';
import { OPERACION } from 'src/app/utils/constants';

@Component({
  selector: 'app-oficinas-detail',
  templateUrl: './oficinas-detail.component.html',
  styleUrl: './oficinas-detail.component.scss'
})
export class OficinasDetailComponent {

  idOficina: any;
  oficinaSeleccionada: Oficina | undefined;
  oficinaForm: FormGroup;
  messages: Message[] = [];
  OPS = OPERACION;
  op: OPERACION = OPERACION.NEW;
  ciudades: Ciudad[] = [];
  urlMapaGuardado: string  = '';

  constructor(
    private readonly uiSpinnerService: UiSpinnerService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly oficinaService: OficinasService,
    private readonly masterDataService: MasterdataService,
    private readonly sanitizer: DomSanitizer,
  ) {
    this.oficinaForm=this.formBuilder.group({});
  }

  ngOnInit() {
    this.getCombos();
    this.activatedRoute.params.subscribe(params => {
      if (params?.['id']) {
        this.idOficina = params['id'];
        this.op = this.OPS.EDIT;
        this.getOficina();
      } else {
        this.fillForm();
      }
    });
  }

  getCombos() {
    this.masterDataService.getCiudades().then((response) => {
      this.ciudades = response;
    }).catch((error) => {
      this.messages = [{ severity: 'error', summary: 'Error', detail: error.error }];
    }).finally(() => {
    });
  }

  getOficina() {
    this.uiSpinnerService.showSpinner("Cargando...");
    this.oficinaService.findById(this.idOficina).then((response) => {
      this.oficinaSeleccionada = response.message;
      this.urlMapaGuardado = this.oficinaSeleccionada?.urlMapsOficina;
      this.fillForm();
    }).catch((error) => {
      this.messages = [{ severity: 'error', summary: 'Error', detail: error.error }];
    }).finally(() => {
      this.uiSpinnerService.hideSpinner();
    });
  }
  
  fillForm() {
    this.oficinaForm = this.formBuilder.group({
      id: [this.oficinaSeleccionada?.id ? this.oficinaSeleccionada.id : null],
      nombre: [this.oficinaSeleccionada?.nombre ? this.oficinaSeleccionada.nombre : null, [FormsValidation.notEmpty]],
      direccion: [this.oficinaSeleccionada?.direccion ? this.oficinaSeleccionada.direccion : null, [FormsValidation.notEmpty]],
      idCiudad: [this.oficinaSeleccionada?.ciudad?.id ? this.oficinaSeleccionada.ciudad.id  : null, [FormsValidation.notEmpty]],
      telefono: [this.oficinaSeleccionada?.telefono ? this.oficinaSeleccionada.telefono : null, [FormsValidation.notEmpty]],
      idUsuarioAlta: [this.oficinaSeleccionada?.idUsuarioAlta ? this.oficinaSeleccionada.idUsuarioAlta : null],
      idUsuarioBaja: [this.oficinaSeleccionada?.idUsuarioBaja ? this.oficinaSeleccionada.idUsuarioBaja : null],
      idUsuarioModif: [this.oficinaSeleccionada?.idUsuarioModif ? this.oficinaSeleccionada.idUsuarioModif : null],
      fechaAlta: [this.oficinaSeleccionada?.fechaAlta ? this.oficinaSeleccionada.fechaAlta : null],
      fechaBaja: [this.oficinaSeleccionada?.fechaBaja ? this.oficinaSeleccionada.fechaBaja : null],
      fechaUltModif: [this.oficinaSeleccionada?.fechaUltModif ? this.oficinaSeleccionada.fechaUltModif : null]
    });
  }

  saveOficina() {
    let oficinaToSend = this.oficinaForm.getRawValue();
    oficinaToSend.ciudad = this.ciudades.find(ciudad => ciudad.id === oficinaToSend.idCiudad);
    if (this.oficinaForm.valid) {
      this.uiSpinnerService.showSpinner("Guardando oficina...");
      this.oficinaService.saveOficina(oficinaToSend)
      .then((response) => {
        if (response.success) {
          this.router.navigate(['/oficinas'], {state: {severity: 'success', detail: 'La oficina se ha guardado correctamente'}});
        }
      })
      .catch((error) => {
        this.messages = [{ severity: 'error', summary: 'Error', detail: error.error }];
      })
      .finally(() => {
        this.uiSpinnerService.hideSpinner();
      });
    } else {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Hay errores en el formulario' }];
    }
  }

  volver() {
    this.router.navigate(['/oficinas']);
  }
}
