import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Oficina } from '../models/oficina.model';
import { ArrayResponse, ObjectResponse } from '../utils/backend-service';

@Injectable({
  providedIn: 'root'
})
export class OficinasService {

  private readonly API_URL: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  async filterOficinas(id: string, idCiudad: string, nombre: string, descripcion: string, page: number, itemsPerPage: number, sort: string, order: string): Promise<ArrayResponse<Oficina>> {
    let parametros = {
      id: id,
      idCiudad: idCiudad,
      nombre: nombre,
      descripcion: descripcion,
      page: page.toString(),
      itemsPerPage: itemsPerPage.toString(),
      sort: sort,
      order: order
    };
    
    return new Promise<ArrayResponse<Oficina>>((resolve, reject) => {
      this.http.get<ObjectResponse<ArrayResponse<Oficina>>>(`${this.API_URL}/api/oficinas/filter`, {params: parametros, observe: 'body'}).subscribe({
        next: (response: ObjectResponse<ArrayResponse<Oficina>>) => {
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

  async findById(id: string): Promise<ObjectResponse<Oficina>> {
    return new Promise<ObjectResponse<Oficina>>((resolve, reject) => {
      this.http.get<ObjectResponse<Oficina>>(`${this.API_URL}/api/oficinas/findById/${id}`,).subscribe({
        next: (response: ObjectResponse<Oficina>) => {
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
      this.http.delete<ObjectResponse<string>>(`${this.API_URL}/api/oficinas/deleteById/${id}`,).subscribe({
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

  async saveOficina(oficina: Oficina): Promise<ObjectResponse<Oficina>> {
    return new Promise<ObjectResponse<Oficina>>((resolve, reject) => {
      this.http.post<ObjectResponse<Oficina>>(`${this.API_URL}/api/oficinas/save`, oficina).subscribe({
        next: (response: ObjectResponse<Oficina>) => {
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
