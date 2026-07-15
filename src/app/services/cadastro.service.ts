import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

    private readonly API = "http://localhost:3001";

    constructor(private http: HttpClient) { }

    getPacientes(): Observable<{ pacientes: Paciente[] }> {
        return this.http.get<{ pacientes: Paciente[] }>(`${this.API}/pacientes`);
    }

    postPaciente(paciente: Omit<Paciente, 'id'>): Observable<{ message: string, novoPaciente: Paciente }> {
        return this.http.post<{ message: string, novoPaciente: Paciente }>(`${this.API}/paciente`, paciente);
    }
}
