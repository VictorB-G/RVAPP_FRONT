import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthResponse } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { LOCAL_STORAGE } from 'src/app/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user = "";
  pass = "";
  messages: Message[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.isLogged()) {
      this.router.navigate(['/inicio']);
    }
  }

  login() {
    this.authService.login(this.user, this.pass, '').subscribe({
      next: (response: AuthResponse) => {
        if (response) {
          localStorage.removeItem(LOCAL_STORAGE.USUARIO_TOKEN);
          localStorage.setItem(LOCAL_STORAGE.USUARIO_TOKEN, response.jwt);
          this.authService.loginSubject.next(true);
          this.router.navigate(['/inicio']);
        } else {
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Se ha producido un error al iniciar sesión. Las credenciales son inválidas o el usuario no se encuentra activo.' }];
        }
      },
      error: (error: HttpErrorResponse) => {
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'Se ha producido un error al iniciar sesión. Las credenciales son inválidas o el usuario no se encuentra activo.' }];
      }
    }
    );
  }
}
