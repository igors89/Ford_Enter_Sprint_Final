import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private readonly API = "http://localhost:3001";

    constructor(private http: HttpClient) { }
    login(usuario: Pick<Usuario, 'nome'|'senha'>): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API}/login`,usuario)
    .pipe(
      tap(
        user => {
          sessionStorage.setItem("email", user.email)
        }
      )
    )
  }
}
