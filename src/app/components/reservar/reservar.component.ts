import { Component } from '@angular/core';
import { Message } from 'primeng/api';
import { RadioButtonClickEvent } from 'primeng/radiobutton';
import { Ciudad } from 'src/app/models/ciudad.model';
import { Oficina } from 'src/app/models/oficina.model';
import { Planta } from 'src/app/models/planta.model';
import { Reserva, ReservaAdd } from 'src/app/models/reserva.model';
import { Sitio } from 'src/app/models/sitio.model';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.scss'
})
export class ReservarComponent {

  messages: Message[] = [];
  activeIndex: number[] = [0];
  disabledTabs: boolean[] = [false, true, true, true];

  //Headers accordion
  headerCiudad: string = 'Selecciona una ciudad';
  headerOficina: string = 'Selecciona una oficina';
  headerPlanta: string = 'Selecciona una planta';

  //Arrays datos
  ciudades: Ciudad[] = [];
  oficinas: Oficina[] = [];
  plantas: Planta[] = [];
  sitios: Sitio[] = [];

  //Datos reserva
  idCiudad: number | null = null;
  idOficina: number | null = null;
  idPlanta: number | null = null;
  idSitio: number | null = null;
  fechaReserva: Date[] | null = null;

  minDate: Date = new Date();
  planta: Planta | null = null;

  constructor(
    private readonly masterDataService: MasterdataService,
    private readonly uiService: UiSpinnerService,
    private readonly plantasService: PlantasService,
    private readonly reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.uiService.showSpinner("Cargando datos...");
    this.masterDataService.getCiudades()
      .then((ciudades) => {
        this.ciudades = ciudades;
      })
      .catch((error) => {
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al obtener las ciudades' }];
      })
      .finally(() => {
        this.uiService.hideSpinner();
      });
  }

  onCiudadChange(event: RadioButtonClickEvent) {
    this.idOficina = null;
    this.idPlanta = null;
    this.idSitio = null;
    this.sitios = [];
    this.fechaReserva = null;
    this.disabledTabs[1] = true;
    this.disabledTabs[2] = true;
    this.disabledTabs[3] = true;
    if (this.idCiudad !== event.value) {
      this.idCiudad = event.value;
    }
    if (this.idCiudad !== null) {
      let ciudad = this.ciudades.find(ciudad => ciudad.id === this.idCiudad);
      this.uiService.showSpinner("Cargando oficinas...");
      this.masterDataService.getOficinasByIdCiudad(this.idCiudad)
        .then((response) => {
          this.oficinas = response;
          this.activeIndex = [1];
          this.disabledTabs[1] = false;
          this.headerCiudad = 'Ciudad seleccionada: ' + ciudad?.nombre;
        }).catch((error) => {
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al obtener las oficinas de la ciudad' }];
        })
        .finally(() => {
          this.uiService.hideSpinner();
        });
    }
  }

  onOficinaChange(event: RadioButtonClickEvent) {
    this.idPlanta = null;
    this.idSitio = null;
    this.sitios = [];
    this.fechaReserva = null;
    this.disabledTabs[2] = true;
    this.disabledTabs[3] = true;
    if (this.idOficina !== event.value) {
      this.idCiudad = event.value;
    }
    if (this.idOficina !== null) {
      let oficina = this.oficinas.find(oficina => oficina.id === this.idOficina);
      this.uiService.showSpinner("Cargando plantas...");
      this.masterDataService.getPlantasByIdOficina(this.idOficina)
        .then((response) => {
          this.plantas = response;
          this.activeIndex = [2];
          this.disabledTabs[2] = false;
          this.headerOficina = 'Oficina seleccionada: ' + oficina?.nombre + " - " + oficina?.direccion;
        }).catch((error) => {
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al obtener las plantas de la oficina' }];
        })
        .finally(() => {
          this.uiService.hideSpinner();
        });
    }
  }

  onPlantaChange(event: RadioButtonClickEvent) {
    this.idSitio = null;
    this.sitios = [];
    this.fechaReserva = null;
    this.disabledTabs[3] = true;
    if (this.idPlanta !== event.value) {
      this.idPlanta = event.value;
    }
    if (this.idPlanta !== null) {
      this.plantasService.findById(this.idPlanta.toString())
        .then((response) => {
          if (response.success) {
            this.planta = response.message;
            this.activeIndex = [3];
            this.disabledTabs[3] = false;
            this.headerPlanta = 'Planta seleccionada: ' + this.planta?.nombre + " - Número planta: " + this.planta?.numPlanta;
          } else {
            this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al obtener el detalle de la planta' }];
          }   
        }).catch((error) => {
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al obtener el detalle de la planta' }];
        })
        .finally(() => {
          this.uiService.hideSpinner();
        });

    }
  }

  onFechaChange(event: any) {
    this.idSitio = null;
    this.sitios = [];
    if (this.fechaReserva !== event) {
      this.fechaReserva = event;
    }
    if (this.fechaReserva !== null && this.fechaReserva[1] != null && this.idPlanta !== null) {
      this.uiService.showSpinner("Buscando sitios libres...");
      this.masterDataService.getSitiosLibres(this.idPlanta, this.fechaReserva[0], this.fechaReserva[1])
        .then((response) => {
          this.sitios = response;
        }).catch((error) => {
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al obtener los sitios libres' }];
        })
        .finally(() => {
          this.uiService.hideSpinner();
        });
    }
  }

  reservarSitio() {
    if (this.idSitio !== null && this.fechaReserva !== null && this.fechaReserva[1] != null) {
      let reserva: ReservaAdd = {
        idSitio: this.idSitio,
        fechaInicio: this.fechaReserva[0].toISOString(),
        fechaFin: this.fechaReserva[1].toISOString()
      };
      this.uiService.showSpinner("Reservando sitio...");
      this.reservaService.reservarSitio(reserva)
        .then((response) => {
          if (response.success) {
            this.messages = [{ severity: 'success', summary: 'Reserva realizada', detail: response.message }];
          } else {
            this.messages = [{ severity: 'error', summary: 'Error', detail: response.error}];
          }
        }).catch((error) => {
          this.messages = [{ severity: 'error', summary: 'Error', detail: error.error }];
        })
        .finally(() => {
          this.uiService.hideSpinner();
          this.timeoutMessages();
        });
    }
  }


  activeIndexChange(event: any) {
    this.activeIndex = event.index;
  }

  convertBlobToImg() {
    if (this.planta?.planoPlanta) {
      return 'data:image/png;base64,' + this.planta?.planoPlanta;
    }
    return undefined;
  }

  timeoutMessages() {
    setTimeout(() => {
     this.messages = [];
    }, 5000);
  }

}
