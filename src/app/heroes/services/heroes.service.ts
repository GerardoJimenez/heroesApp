import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }
  getHeroes(): Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }
  getHeroe(id: string): Observable<Heroe> {
    return this.httpClient.get<Heroe>(`${ this.baseUrl }/heroes/${id}`);
  }
  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`);
  }
  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.httpClient.post<Heroe>(`${ this.baseUrl}/heroes`, heroe);
  }
  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.httpClient.put<Heroe>(`${ this.baseUrl}/heroes/${ heroe.id }`, heroe);
  }
  eliminarHeroe(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${ this.baseUrl}/heroes/${ id }`);
  }
}
