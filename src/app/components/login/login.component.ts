import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { ObjectResponse } from 'src/app/utils/backend-service';
import { LOCAL_STORAGE } from 'src/app/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user = "";
  pass = "";

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    //TODO: revisar si hay token ya para validarlo y logear automaticamente
  }

  login() {
    this.authService.login(this.user, this.pass, '').subscribe({
      next: (response: AuthResponse) => {
        if (response) {
          localStorage.removeItem(LOCAL_STORAGE.USUARIO_TOKEN);
          localStorage.setItem(LOCAL_STORAGE.USUARIO_TOKEN, JSON.stringify(response.jwt));
          this.authService.loggedIn.next(true);
          this.router.navigate(['/']);
        } else {
          //this.messages = [{ severity: 'error', summary: 'Error', detail: response.error }];
        }
      },
      error: (error: HttpErrorResponse) => {
      //TODO: revisar como pintar mensajes
       // this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al hacer el login' }];
      }
    }
    );
  }

}
