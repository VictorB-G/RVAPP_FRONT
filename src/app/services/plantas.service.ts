import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArrayResponse, ObjectResponse } from '../utils/backend-service';
import { Planta } from '../models/planta.model';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {
  private readonly API_URL: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  async filterPlantas(id: string, idCiudad: string, idOficina: string,  nombre: string, numPlantas: string, page: number, itemsPerPage: number, sort: string, order: string): Promise<ArrayResponse<Planta>> {
    let parametros = {
      id: id,
      idCiudad: idCiudad,
      idOficina: idOficina,
      nombre: nombre,
      numPlanta: numPlantas,
      page: page.toString(),
      itemsPerPage: itemsPerPage.toString(),
      sort: sort,
      order: order
    };
    
    return new Promise<ArrayResponse<Planta>>((resolve, reject) => {
      this.http.get<ObjectResponse<ArrayResponse<Planta>>>(`${this.API_URL}/api/plantas/filter`, {params: parametros, observe: 'body'}).subscribe({
        next: (response: ObjectResponse<ArrayResponse<Planta>>) => {
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

  async findById(id: string): Promise<ObjectResponse<Planta>> {
    return new Promise<ObjectResponse<Planta>>((resolve, reject) => {
      this.http.get<ObjectResponse<Planta>>(`${this.API_URL}/api/plantas/findById/${id}`,).subscribe({
        next: (response: ObjectResponse<Planta>) => {
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

  async deleteById(id: string): Promise<ObjectResponse<string>> {
    return new Promise<ObjectResponse<string>>((resolve, reject) => {
      this.http.delete<ObjectResponse<string>>(`${this.API_URL}/api/plantas/deleteById/${id}`,).subscribe({
        next: (response: ObjectResponse<string>) => {
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

  async savePlanta(planta: Planta): Promise<ObjectResponse<Planta>> {
    return new Promise<ObjectResponse<Planta>>((resolve, reject) => {
      this.http.post<ObjectResponse<Planta>>(`${this.API_URL}/api/plantas/save`, planta).subscribe({
        next: (response: ObjectResponse<Planta>) => {
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

  async savePlanoPlanta(idPlanta: number, plano: Blob): Promise<ObjectResponse<Blob>> {
    const formData = new FormData();
    formData.append('file', plano);
    return new Promise<ObjectResponse<Blob>>((resolve, reject) => {
      this.http.post<ObjectResponse<Blob>>(`${this.API_URL}/api/plantas/savePlano/${idPlanta}`, formData).subscribe({
        next: (response: ObjectResponse<Blob>) => {
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
