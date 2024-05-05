import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { Ciudad } from 'src/app/models/ciudad.model';
import { Oficina } from 'src/app/models/oficina.model';
import { Planta } from 'src/app/models/planta.model';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';
import { FormsValidation } from 'src/app/services/validators/forms.validator';
import { OPERACION } from 'src/app/utils/constants';

@Component({
  selector: 'app-plantas-detail',
  templateUrl: './plantas-detail.component.html',
  styleUrl: './plantas-detail.component.scss'
})
export class PlantasDetailComponent {

  ficheroPlano: any;
  idPlanta: any;
  plantaSeleccionada: Planta | undefined;
  plantaForm: FormGroup;
  messages: Message[] = [];
  OPS = OPERACION;
  op: OPERACION = OPERACION.NEW;
  ciudades: Ciudad[] = [];
  oficinas: Oficina[] = [];
  ficheroCargado: any;

  constructor(
    private readonly uiSpinnerService: UiSpinnerService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly plantaService: PlantasService,
    private readonly masterDataService: MasterdataService
  ) {
    this.plantaForm=this.formBuilder.group({});
  }

  ngOnInit() {
    this.getCombos();
    this.activatedRoute.params.subscribe(params => {
      if (params?.['id']) {
        this.idPlanta = params['id'];
        this.op = this.OPS.EDIT;
        this.getPlanta();
      } else {
        this.fillForm();
      }
    });
  }

  getCombos() {
    this.masterDataService.getCiudades().then((response) => {
      this.ciudades = response;
      this.getOficinaPorCiudad(this.plantaSeleccionada?.oficina?.ciudad?.id)
    }).catch((error) => {
      this.messages = [{ severity: 'error', summary: 'Error', detail: error.error }];
    }).finally(() => {
    });
  }

  obtenerOficinas() {
    if (this.plantaForm.get('idCiudad')?.value == null){
      this.oficinas = [];
      return;
    }
    this.getOficinaPorCiudad(this.plantaForm.get('idCiudad')?.value);
  }

  getOficinaPorCiudad(id: any) {
    if (id != null) {
      this.masterDataService.getOficinasByIdCiudad(id).then((response) => {
        this.oficinas = response;
      }).catch((error) => {
        this.messages = [{ severity: 'error', summary: 'Error', detail: error.error }];
      }).finally(() => {
      });
    }
  }

  getPlanta() {
    this.uiSpinnerService.showSpinner("Cargando...");
    this.plantaService.findById(this.idPlanta).then((response) => {
      this.plantaSeleccionada = response.message;
      this.ficheroCargado = this.plantaSeleccionada?.planoPlanta;
      this.fillForm();
      this.obtenerOficinas();
    }).catch((error) => {
      this.messages = [{ severity: 'error', summary: 'Error', detail: error.error }];
    }).finally(() => {
      this.uiSpinnerService.hideSpinner();
    });
  }
  
  fillForm() {
    this.plantaForm = this.formBuilder.group({
      id: [this.plantaSeleccionada?.id ? this.plantaSeleccionada.id : null],
      idCiudad: [this.plantaSeleccionada?.oficina?.ciudad?.id ? this.plantaSeleccionada.oficina.ciudad.id : null, [FormsValidation.notEmpty]],
      idOficina: [this.plantaSeleccionada?.oficina?.id ? this.plantaSeleccionada.oficina.id : null, [FormsValidation.notEmpty]],
      nombre: [this.plantaSeleccionada?.nombre ? this.plantaSeleccionada.nombre : null, [FormsValidation.notEmpty]],
      numPlanta: [this.plantaSeleccionada?.numPlanta ? this.plantaSeleccionada.numPlanta : null, [FormsValidation.notEmpty]],
      numeroSitios: [this.plantaSeleccionada?.numeroSitios ? this.plantaSeleccionada.numeroSitios : null ,[FormsValidation.notEmpty, FormsValidation.isNumber]],
      planoPlanta: [this.plantaSeleccionada?.planoPlanta ? this.plantaSeleccionada.planoPlanta : null],
      idUsuarioAlta: [this.plantaSeleccionada?.idUsuarioAlta ? this.plantaSeleccionada.idUsuarioAlta : null],
      idUsuarioBaja: [this.plantaSeleccionada?.idUsuarioBaja ? this.plantaSeleccionada.idUsuarioBaja : null],
      idUsuarioModif: [this.plantaSeleccionada?.idUsuarioModif ? this.plantaSeleccionada.idUsuarioModif : null],
      fechaAlta: [this.plantaSeleccionada?.fechaAlta ? this.plantaSeleccionada.fechaAlta : null],
      fechaBaja: [this.plantaSeleccionada?.fechaBaja ? this.plantaSeleccionada.fechaBaja : null],
      fechaUltModif: [this.plantaSeleccionada?.fechaUltModif ? this.plantaSeleccionada.fechaUltModif : null]
    });
    if (this.op === OPERACION.EDIT) {
      this.plantaForm.get('numeroSitios')?.disable();
    }
  }

  async subirPlano(event: FileUploadHandlerEvent) {
    let file = event.files[0];
    if (file) {
      this.uiSpinnerService.showSpinner("Subiendo plano...");
      this.plantaService.savePlanoPlanta(this.idPlanta, file)
      .then((response) => {
        this.ficheroCargado = response.message;
        this.ficheroPlano = null;
        this.messages = [{ severity: 'success', summary: 'Operación realizada', detail: 'Plano subido correctamente' }];
      }).catch((error) => {
        this.messages = [{ severity: 'error', summary: 'Error', detail: error.error }];
      }).finally(() => {
        this.timeoutMessages();
        this.uiSpinnerService.hideSpinner();
      });
    }
  }

  savePlanta() {
    let plantaToSend = this.plantaForm.getRawValue();
    plantaToSend.oficina = this.oficinas.find(oficina => oficina.id === plantaToSend.idOficina);
    if (this.plantaForm.valid) {
      this.uiSpinnerService.showSpinner("Guardando planta...");
      this.plantaService.savePlanta(plantaToSend)
      .then((response) => {
        if (response.success) {
          this.router.navigate(['/plantas'], {state: {severity: 'success', detail: 'La planta se ha guardado correctamente'}});
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
    this.router.navigate(['/plantas']);
  }

  convertBlobToImg() {
    if (this.ficheroCargado) {
      return 'data:image/png;base64,' + this.ficheroCargado;
    }
    return undefined;
  }

  timeoutMessages() {
    setTimeout(() => {
     this.messages = [];
    }, 5000);
  }
}
