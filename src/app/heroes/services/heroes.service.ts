import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl:string = environment.baseUrl
  heroe!:Heroe;
  constructor(private http: HttpClient) { }

  getHeroes():Observable<Heroe[]> {
   return this.http.get<Heroe[]> (`${this.baseUrl}/heroes`)
  }
  getHeroePorId(id: string): Observable<Heroe>{
    return this.http.get<Heroe> (`${this.baseUrl}/heroes/${id}`);
  }
  // obtener = get
  getSugerencias(termino:string): Observable<Heroe[]>{
    return this.http.get<Heroe[]> (`${this.baseUrl}/heroes/?q=${termino}&_limit=10`);

  }
  // Agregar = post
  addHero( heroe: Heroe): Observable<Heroe>{
return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }
  //actualizar = put
  actualizatHeroe( heroe: Heroe): Observable<Heroe>{
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id} `, heroe);
      }
      // borrar = delete
      borrarHeroe( id:string): Observable<any>{
        return this.http.delete<any>(`${this.baseUrl}/heroes/${id} `);
          }
}
