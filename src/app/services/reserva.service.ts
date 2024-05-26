import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva, ReservaAdd } from '../models/reserva.model';
import { ArrayResponse, ObjectResponse } from '../utils/backend-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private readonly API_URL: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  async reservarSitio(reserva: ReservaAdd): Promise<ObjectResponse<string>> {
    return new Promise<ObjectResponse<string>>((resolve, reject) => {
      this.http.post<ObjectResponse<string>>(`${this.API_URL}/api/reservas/save`, reserva).subscribe({
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

  async getMisReservas(page: number, itemsPerPage: number, sort: string, order: string): Promise<ArrayResponse<Reserva>> {
    let parametros = {
      page: page.toString(),
      itemsPerPage: itemsPerPage.toString(),
      sort: sort,
      order: order
    };
    
    return new Promise<ArrayResponse<Reserva>>((resolve, reject) => {
      this.http.get<ObjectResponse<ArrayResponse<Reserva>>>(`${this.API_URL}/api/reservas/list`, {params: parametros, observe: 'body'}).subscribe({
        next: (response: ObjectResponse<ArrayResponse<Reserva>>) => {
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

  async deleteById(id: string): Promise<ObjectResponse<string>> {
    return new Promise<ObjectResponse<string>>((resolve, reject) => {
      this.http.delete<ObjectResponse<string>>(`${this.API_URL}/api/reservas/anularReserva/${id}`,).subscribe({
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
}
