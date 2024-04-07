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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PreLoginComponent,
    AutoRegisterComponent
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

    // PrimeNG
    CardModule,
    ButtonModule,
    BreadcrumbModule,
    InputTextModule,
    PasswordModule,
    MessagesModule
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
