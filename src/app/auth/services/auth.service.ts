import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {


  private baseUrl=environments.baseUrl;
  private user?:User;

  // Inyectamos el servicio en el constructor
  constructor(private http:HttpClient) { }


  // El get del user
  get currentUser():User|undefined{
    if(!this.user)
      return undefined
    // Devolvemos un clon del user, para no modificarlo
    return structuredClone(this.user);
  }

  // Metodo para el login
  login(email:string, password:string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      // Buscamos el usuario en el json-server
      tap(user=>this.user=user),
      // guardamos el user en memoria local
      tap(user=>localStorage.setItem('token', user.id))
    );
  }

  logout(){
    this.user=undefined;
    localStorage.clear();
  }

  checkAuthentication():Observable<boolean>{
    if(!localStorage.getItem('token'))
      return of(false);

    const token = localStorage.getItem('token')

    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user=>this.user=user),
      map(user=>!!user),
      catchError(err=>of(false))
    )
  }
}
