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

    formatarContato(contato: number | string): string {
        const c = contato.toString().replace(/\D/g, '');
        return c.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
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
        const numeroLimpo = p.contato.toString().replace(/\D/g, '');
        const numeroWhatsApp = `55${numeroLimpo}`;
        const mensagem = `Olá, ${p.nome}, como vai? Sua próxima sessão será em breve! Você poderá comparecer? Por favor, confirme sua presença assim que possível! Obrigada!`;
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    }

    lembretePagamento(p: Paciente): void {
        const numeroLimpo = p.contato.toString().replace(/\D/g, '');
        const numeroWhatsApp = `55${numeroLimpo}`;
        const mensagem = `Olá, ${p.nome}, como vai? Até o momento não identifiquei o seu pagamento das sessões! Por favor, peço que regularize para podermos continuar com as sessões! Caso já estiver regularizado, por favor desconsidere esta mensagem! Obrigada!`;
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    }

    logout(): void {
        this.router.navigate(['']);
    }
}
