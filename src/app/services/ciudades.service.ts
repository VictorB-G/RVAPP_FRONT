import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArrayResponse, ObjectResponse } from '../utils/backend-service';
import { Ciudad } from '../models/ciudad.model';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private readonly API_URL: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  async filterCiudades(id: string, nombre: string, codigo: string, page: number, itemsPerPage: number, sort: string, order: string): Promise<ArrayResponse<Ciudad>> {
    let parametros = {
      id: id,
      nombre: nombre,
      codigo: codigo,
      page: page.toString(),
      itemsPerPage: itemsPerPage.toString(),
      sort: sort,
      order: order
    };
    
    return new Promise<ArrayResponse<Ciudad>>((resolve, reject) => {
      this.http.get<ObjectResponse<ArrayResponse<Ciudad>>>(`${this.API_URL}/api/ciudades/filter`, {params: parametros, observe: 'body'}).subscribe({
        next: (response: ObjectResponse<ArrayResponse<Ciudad>>) => {
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

  async findById(id: string): Promise<ObjectResponse<Ciudad>> {
    return new Promise<ObjectResponse<Ciudad>>((resolve, reject) => {
      this.http.get<ObjectResponse<Ciudad>>(`${this.API_URL}/api/ciudades/findById/${id}`,).subscribe({
        next: (response: ObjectResponse<Ciudad>) => {
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
      this.http.delete<ObjectResponse<string>>(`${this.API_URL}/api/ciudades/deleteById/${id}`,).subscribe({
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

  async saveCiudad(ciudad: Ciudad): Promise<ObjectResponse<Ciudad>> {
    return new Promise<ObjectResponse<Ciudad>>((resolve, reject) => {
      this.http.post<ObjectResponse<Ciudad>>(`${this.API_URL}/api/ciudades/save`, ciudad).subscribe({
        next: (response: ObjectResponse<Ciudad>) => {
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
