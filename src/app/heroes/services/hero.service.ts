import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // Esto nos lleva a la db en json server
  private baseUrl:string=environments.baseUrl;

  constructor(private http:HttpClient) { }
// Guardamos los heroes como observable para usarlos en otros sitios
  getHeroes(): Observable<Hero[]>{
    // Recogemos los datos de la base de datos guardada en la url
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id:string): Observable<Hero|undefined>{
    // Recogemos los datos de la base de datos guardada en la url
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${ id }`).
    pipe(catchError(error => of(undefined)));
  }

  // Metodo para las sugerencias, que va a coger el input
  getSuggestions(query:string):Observable<Hero[]>{
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes/?q=${ query }&_limit=5`)
  }

  // Metodo para agregar un heroe con un post
  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero)
  }
  // Metodo para actualizar un heroe copn un patch
  updateHero(hero:Hero):Observable<Hero>{
    if(!hero.id)
      throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero)
  }

  // Metodo para borrar por un delete, requiere id
  deleteHeroById(id:string):Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      // Si se ha borrado, da true
      map(response=>true),
      // Si no, da error, que convertimos en un observable con of
      catchError(error=>of(false))
    );
  }


}
