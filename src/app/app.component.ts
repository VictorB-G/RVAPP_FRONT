import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ReservAPP';

  constructor(private config: PrimeNGConfig) {}

  ngOnInit() {
      this.config.setTranslation({
          accept: 'Aceptar',
          reject: 'Cancelar',
          weak: 'Débil',
          medium: 'Medio',
          strong: 'Fuerte',
          passwordPrompt: 'Introduzca una contraseña',
          emptyFilterMessage: 'No se han encontrado resultados',
          emptyMessage: 'No hay registros',
          cancel: 'Cancelar',
          choose: 'Elegir fichero',
          upload: 'Subir',
          dateAfter: 'Fecha después',
          dateBefore: 'Fecha antes',
          clear: 'Limpiar',
          today: 'Hoy',
          dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
          dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
          dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
          monthNames: [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre"
          ],
          monthNamesShort: [
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Sep",
              "Oct",
              "Nov",
              "Dic"
          ],
          weekHeader: 'Semana',
          firstDayOfWeek: 1

          //translations
      });
  }
}
