import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol.model';
import { ObjectResponse } from '../utils/backend-service';
import { Ciudad } from '../models/ciudad.model';
import { Oficina } from '../models/oficina.model';

@Injectable({
  providedIn: 'root'
})
export class MasterdataService {

  private readonly API_URL: string = environment.apiBaseUrl + '/api/masterdata';
  constructor(
    private http: HttpClient
  ) { }

  async getRoles(): Promise<Rol[]> {
    return new Promise((resolve, reject) => {
      this.http.get<ObjectResponse<Rol[]>>(`${this.API_URL}/getRoles`, {
          observe: 'body'
      }).subscribe({
          next: (response: ObjectResponse<Rol[]>) => {
            if (response.success){
              resolve(response.message);
            } else {
              reject(response.error);
            }
          }, error: (error) =>{
            reject('Error al obtener los roles')
          }
        });
    });
  }


  async getCiudades(): Promise<Ciudad[]> {
    return new Promise((resolve, reject) => {
      this.http.get<ObjectResponse<Ciudad[]>>(`${this.API_URL}/getCiudades`, {
          observe: 'body'
      }).subscribe({
          next: (response: ObjectResponse<Ciudad[]>) => {
            if (response.success){
              resolve(response.message);
            } else {
              reject(response.error);
            }
          }, error: (error) =>{
            reject('Error al obtener las ciudades')
          }
        });
    });
  }

  async getOficinas(): Promise<Oficina[]> {
    return new Promise((resolve, reject) => {
      this.http.get<ObjectResponse<Oficina[]>>(`${this.API_URL}/getOficinas`, {
          observe: 'body'
      }).subscribe({
          next: (response: ObjectResponse<Oficina[]>) => {
            if (response.success){
              resolve(response.message);
            } else {
              reject(response.error);
            }
          }, error: (error) =>{
            reject('Error al obtener las oficinas')
          }
        });
    });
  }


  async getOficinasByIdCiudad(idCiudad: number): Promise<Oficina[]> {
    return new Promise((resolve, reject) => {
      this.http.get<ObjectResponse<Oficina[]>>(`${this.API_URL}/getOficinasByIdCiudad/`+idCiudad, {
          observe: 'body'
      }).subscribe({
          next: (response: ObjectResponse<Oficina[]>) => {
            if (response.success){
              resolve(response.message);
            } else {
              reject(response.error);
            }
          }, error: (error) =>{
            reject('Error al obtener las oficinas')
          }
        });
    });
  }
}
