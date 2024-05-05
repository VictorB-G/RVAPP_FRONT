import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CheckboxModule } from 'primeng/checkbox';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { PreLoginComponent } from './components/pre-login/pre-login.component';
import { AutoRegisterComponent } from './components/auto-register/auto-register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { InicioComponent } from './components/inicio/inicio.component';
import { FicharComponent } from './components/fichar/fichar.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { OficinasComponent } from './components/oficinas/oficinas.component';
import { PlantasComponent } from './components/plantas/plantas.component';
import { DialogModule } from 'primeng/dialog';
import { UsuariosDetailComponent } from './components/usuarios/usuarios-detail/usuarios-detail.component';
import { CiudadesDetailComponent } from './components/ciudades/ciudades-detail/ciudades-detail.component';
import { OficinasDetailComponent } from './components/oficinas/oficinas-detail/oficinas-detail.component';
import { NgOptimizedImage } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { PlantasDetailComponent } from './components/plantas/plantas-detail/plantas-detail.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PreLoginComponent,
    AutoRegisterComponent,
    UsuariosComponent,
    InicioComponent,
    FicharComponent,
    CiudadesComponent,
    OficinasComponent,
    PlantasComponent,
    UsuariosDetailComponent,
    CiudadesDetailComponent,
    OficinasDetailComponent,
    PlantasDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CheckboxModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    NgOptimizedImage,
    GoogleMapsModule,

    // PrimeNG
    CardModule,
    ButtonModule,
    BreadcrumbModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    TableModule,
    MultiSelectModule,
    PaginatorModule,
    AccordionModule,
    DropdownModule,
    DialogModule,
    FileUploadModule,
    ImageModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
