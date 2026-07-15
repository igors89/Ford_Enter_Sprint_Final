import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../models/paciente';
import { CadastroService } from '../../services/cadastro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel',
  imports: [CommonModule,FormsModule],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})
export class PainelComponent implements OnInit {

    pacientes: Paciente[] = [];

    formPaciente = { nome: '', contato: null as number | null, dataInicio: '' };

    constructor(
        private cadServ: CadastroService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.carregarPacientes();
    }

    carregarPacientes(): void {
        this.cadServ.getPacientes().subscribe({
            next: (res) => this.pacientes = res.pacientes,
            error: (err) => console.error("Erro ao carregar pacientes", err)
        });
    }

    salvarPaciente(): void {
        if (!this.formPaciente.nome || !this.formPaciente.contato || !this.formPaciente.dataInicio) return;

        const timestampData = new Date(this.formPaciente.dataInicio + 'T00:00:00').getTime();

        const payload: Omit<Paciente, 'id'> = {
            nome: this.formPaciente.nome,
            contato: Number(this.formPaciente.contato),
            dataInicio: timestampData
        };

        this.cadServ.postPaciente(payload).subscribe({
            next: () => {
                this.formPaciente = { nome: '', contato: null, dataInicio: '' };
                this.carregarPacientes();
            },
            error: (err) => alert("Erro ao cadastrar o paciente.")
        });
    }

    lembreteSessao(p: Paciente): void {
        alert(`Enviando WhatsApp de SESSÃO para:\nNome: ${p.nome}\nContato: ${p.contato}`);
    }

    lembretePagamento(p: Paciente): void {
        alert(`Enviando WhatsApp de PAGAMENTO para:\nNome: ${p.nome}\nContato: ${p.contato}`);
    }

    logout(): void {
        this.router.navigate(['']);
    }
}
