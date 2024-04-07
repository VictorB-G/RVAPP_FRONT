import { NgModule } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    ProgressSpinnerModule
  ],
  exports:[
    HeaderComponent,
    SpinnerComponent,
    ProgressSpinnerModule
  ],
})
export class SharedModule { }
