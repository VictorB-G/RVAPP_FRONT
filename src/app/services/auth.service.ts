import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, ROL } from '../utils/constants';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ObjectResponse } from '../utils/backend-service';
import { AuthRequest, AuthResponse } from '../models/auth.model';
import { Generic } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL: string = environment.apiBaseUrl;
  public loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);
  private usuarioActual: Usuario;

  constructor( 
    readonly router: Router,
    private http: HttpClient
  ) { 
    this.usuarioActual = this.inicializarUsuario()
  }

  inicializarUsuario(): Usuario {
    return {
      id: undefined,
      nif: '',
      nombre: '',
      apellido1: '',
      apellido2: '',
      email: '',
      rol: {
        id: undefined,
        codRol: '',
        descripcion: '',
      },
      activo: false
    };
  }

  public get getRol() {
    if (Generic.isNullOrUndefined(this.usuarioActual)) {
      return null;
    }
    return this.usuarioActual?.rol;
  }

  public get isAdmin(): boolean {
    if (Generic.isNullOrUndefined(this.usuarioActual)) {
      return false;
    }
    return this.usuarioActual?.rol?.codRol === ROL.ADMIN;
  }

  getLoggedUser(): Usuario | null {
    return null;
    /*let user: Usuario = this.usuarioActual;
    if (this.usuarioActual?.id == null || this.usuarioActual?.id == undefined){
      let userString = localStorage.getItem(LOCAL_STORAGE.USUARIO_TOKEN);
      if(userString != null && userString!==JSON.stringify(user)){
        user = JSON.parse(userString);
      }
    } 
    return user;*/
  }

  login(login: string, pass: string, nif: string): Observable<AuthResponse> {
    const authRequest: AuthRequest = {
      nif: nif,
      username: login,
      pass: pass
    };
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`,authRequest);
  }

  logout(): void {
    localStorage.removeItem(LOCAL_STORAGE.USUARIO_TOKEN);
    this.usuarioActual = this.inicializarUsuario();
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }

  isLogged(): boolean {
    let jwt = localStorage.getItem(LOCAL_STORAGE.USUARIO_TOKEN);
    if (jwt != null) {
      return true;
    } else {
      this.loggedIn.next(false);
      return false;
    }
  }

  loginStatusChange(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
