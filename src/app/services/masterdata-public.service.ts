import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObjectResponse } from '../utils/backend-service';
import { Rol } from '../models/rol.model';
import { Usuario, UsuarioAlta } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class MasterdataPublicService {

  private readonly API_URL: string = environment.apiBaseUrl;
  constructor(
    private http: HttpClient
  ) { }

  async getRolAutoregister(): Promise<Rol> {
    return new Promise((resolve, reject) => {
      this.http.get<ObjectResponse<Rol>>(`${this.API_URL}/public/findRolAutoregistro`, {
          observe: 'body'
      }).subscribe({
          next: (response: ObjectResponse<Rol>) => {
            if (response.success){
              resolve(response.message);
            } else {
              reject(response.error);
            }
          }, error: (error) =>{
            reject('Error al obtener el rol de autoregistro')
          }
        });
    });
  }

  async autoRegisterUser(user: UsuarioAlta): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      this.http.post<ObjectResponse<Usuario>>(`${this.API_URL}/public/autoRegisterUser`, user, {
          observe: 'body'
      }).subscribe({
          next: (response: ObjectResponse<Usuario>) => {
            if (response.success){
              resolve(response.message);
            } else {
              reject(response.error);
            }
          }, error: (error) =>{
            reject('Error al realizar el autoregistro de usuario')
          }
        });
    });
  }
}
