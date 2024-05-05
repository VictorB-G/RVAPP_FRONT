import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario, UsuarioAlta } from '../models/usuario.model';
import { ArrayResponse, ObjectResponse } from '../utils/backend-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  async filterUsers(nif: string, rol: string, email: string, nombre: string,
  apellido1: string, activo: string, page: number, itemsPerPage: number,
  sort: string, order: string): Promise<ArrayResponse<Usuario>> {
    let parametros = {
      nif: nif,
      rol: rol.trim(),
      email: email,
      nombre: nombre,
      apellido1: apellido1,
      activo: activo.trim(),
      page: page.toString(),
      itemsPerPage: itemsPerPage.toString(),
      sort: sort,
      order: order
    };
    
    return new Promise<ArrayResponse<Usuario>>((resolve, reject) => {
      this.http.get<ObjectResponse<ArrayResponse<Usuario>>>(`${this.API_URL}/api/usuarios/filter`, {params: parametros, observe: 'body'}).subscribe({
        next: (response: ObjectResponse<ArrayResponse<Usuario>>) => {
          if (response.success){
            resolve(response.message);
          } else {
            reject(response.message);
          }
        }, error: (error) =>{
          reject(error);
        }
      });
    });
  }

  async saveUser(user: UsuarioAlta): Promise<ObjectResponse<Usuario>> {
    return new Promise<ObjectResponse<Usuario>>((resolve, reject) => {
      this.http.post<ObjectResponse<Usuario>>(`${this.API_URL}/api/usuarios/newUser`, user).subscribe({
        next: (response: ObjectResponse<Usuario>) => {
          if (response.success){
            resolve(response);
          } else {
            reject(response);
          }
        }, error: (error) =>{
          reject(error);
        }
      });
    });
  }

  async updateUser(user: UsuarioAlta): Promise<ObjectResponse<Usuario>> {
    return new Promise<ObjectResponse<Usuario>>((resolve, reject) => {
      this.http.put<ObjectResponse<Usuario>>(`${this.API_URL}/api/usuarios/editUser`, user).subscribe({
        next: (response: ObjectResponse<Usuario>) => {
          if (response.success){
            resolve(response);
          } else {
            reject(response);
          }
        }, error: (error) =>{
          reject(error);
        }
      });
    });
  }

  async findById(id: String): Promise<ObjectResponse<Usuario>> {
    return new Promise<ObjectResponse<Usuario>>((resolve, reject) => {
      this.http.get<ObjectResponse<Usuario>>(`${this.API_URL}/api/usuarios/findById/${id}`,).subscribe({
        next: (response: ObjectResponse<Usuario>) => {
          if (response.success){
            resolve(response);
          } else {
            reject(response);
          }
        }, error: (error) =>{
          reject(error);
        }
      });
    });
  }
}
