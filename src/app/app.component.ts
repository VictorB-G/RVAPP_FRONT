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
          //translations
      });
  }
}
