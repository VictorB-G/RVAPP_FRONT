import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Ciudad } from 'src/app/models/ciudad.model';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';
import { FormsValidation } from 'src/app/services/validators/forms.validator';
import { OPERACION } from 'src/app/utils/constants';

@Component({
  selector: 'app-ciudades-detail',
  templateUrl: './ciudades-detail.component.html',
  styleUrl: './ciudades-detail.component.scss'
})
export class CiudadesDetailComponent {

  idCiudad: any;
  ciudadSeleccionada: Ciudad | undefined;
  ciudadForm: FormGroup;
  messages: Message[] = [];
  OPS = OPERACION;
  op: OPERACION = OPERACION.NEW;

  constructor(
    private readonly uiSpinnerService: UiSpinnerService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly ciudadService: CiudadesService,
  ) {
    this.ciudadForm=this.formBuilder.group({});
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params?.['id']) {
        this.idCiudad = params['id'];
        this.op = this.OPS.EDIT;
        this.getCiudad();
      } else {
        this.fillForm();
      }
    });
  }

  getCiudad() {
    this.uiSpinnerService.showSpinner("Cargando...");
    this.ciudadService.findById(this.idCiudad).then((response) => {
      this.ciudadSeleccionada = response.message;
      this.fillForm();
    }).catch((error) => {
      this.messages = [{ severity: 'error', summary: 'Error', detail: error.error }];
    }).finally(() => {
      this.uiSpinnerService.hideSpinner();
    });
  }
  
  fillForm() {
    this.ciudadForm = this.formBuilder.group({
      id: [this.ciudadSeleccionada?.id ? this.ciudadSeleccionada.id : null],
      codigo: [this.ciudadSeleccionada?.codigo ? this.ciudadSeleccionada.codigo : null, [FormsValidation.notEmpty]],
      nombre: [this.ciudadSeleccionada?.nombre ? this.ciudadSeleccionada.nombre : null, [FormsValidation.notEmpty]],
      idUsuarioAlta: [this.ciudadSeleccionada?.idUsuarioAlta ? this.ciudadSeleccionada.idUsuarioAlta : null],
      idUsuarioBaja: [this.ciudadSeleccionada?.idUsuarioBaja ? this.ciudadSeleccionada.idUsuarioBaja : null],
      idUsuarioModif: [this.ciudadSeleccionada?.idUsuarioModif ? this.ciudadSeleccionada.idUsuarioModif : null],
      fechaAlta: [this.ciudadSeleccionada?.fechaAlta ? this.ciudadSeleccionada.fechaAlta : null],
      fechaBaja: [this.ciudadSeleccionada?.fechaBaja ? this.ciudadSeleccionada.fechaBaja : null],
      fechaUltModif: [this.ciudadSeleccionada?.fechaUltModif ? this.ciudadSeleccionada.fechaUltModif : null]
    });

  }

  saveCiudad() {
    let ciudadToSend = this.ciudadForm.getRawValue();
    if (this.ciudadForm.valid) {
      this.uiSpinnerService.showSpinner("Guardando ciudad...");
      this.ciudadService.saveCiudad(ciudadToSend)
      .then((response) => {
        if (response.success) {
          this.router.navigate(['/ciudades'], {state: {severity: 'success', detail: 'La ciudad se ha guardado correctamente'}});
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
    this.router.navigate(['/ciudades']);
  }

}
