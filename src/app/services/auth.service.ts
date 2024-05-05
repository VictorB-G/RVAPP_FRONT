import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, ROL } from '../utils/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { ObjectResponse } from '../utils/backend-service';
import { AuthRequest, AuthResponse } from '../models/auth.model';
import { Generic } from '../utils/utils';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL: string = environment.apiBaseUrl;
  usuarioActual: Usuario | null = null;
  loginSubject = new BehaviorSubject(false);
  constructor(
    readonly router: Router,
    private http: HttpClient
  ) {
  }

  decodificarToken(): any {
    try {
      return jwtDecode(localStorage.getItem(LOCAL_STORAGE.USUARIO_TOKEN) || '');
    } catch(Error) {
      return null;
    }
  }

  public get getRol() {
    if (Generic.isNullOrUndefined(this.usuarioActual)) {
      return null;
    }
    return this.usuarioActual?.rol;
  }

  public get isAdmin(): boolean {
    let tokenDecoded = this.decodificarToken();
    let rol = tokenDecoded?.rol;
    if (Generic.isNullOrUndefined(rol)) {
      return false;
    }
    return rol == ROL.ADMIN;
  }

  public get userId(): string {
    let tokenDecoded = this.decodificarToken();
    let id = tokenDecoded?.id;
    if (Generic.isNullOrUndefined(id)) {
      return id;
    }
    return id;
  }

  getLoggedUser(): Promise<Usuario | null> {
    if (!this.isLogged()) { return Promise.resolve(this.usuarioActual); }
    if (this.usuarioActual != null) { return Promise.resolve(this.usuarioActual); }
    return new Promise<Usuario>((resolve, reject) => {
      this.http.get<ObjectResponse<Usuario>>(`${this.API_URL}/auth/user`, {
        observe: 'body'
      }).subscribe({
        next: (response: ObjectResponse<Usuario>) => {
          if (response.success) {
            resolve(response.message);
          } else {
            reject(response.error);
          }
        }, error: (error) => {
          reject('Error al obtener el usuario loggeado')
        }
      });
    });
  }

  login(login: string, pass: string, nif: string): Observable<AuthResponse> {
    const authRequest: AuthRequest = {
      nif: nif,
      username: login,
      pass: pass
    };
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, authRequest);
  }

  logout(): void {
    localStorage.removeItem(LOCAL_STORAGE.USUARIO_TOKEN);
    this.usuarioActual = null;
    this.router.navigate(['']);
    this.loginSubject.next(false);
  }

  isLogged(): boolean {
    let jwt = localStorage.getItem(LOCAL_STORAGE.USUARIO_TOKEN);
    if (jwt != null) {
      return true;
    } else {
      return false;
    }
  }

  refreshLogin(): void {
    if (this.isLogged()) {
      this.loginSubject.next(true);
    } else {
      this.loginSubject.next(false);
    }
  }
}
