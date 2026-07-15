import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-cabecalho',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {

    loginForm = {
        nome: '',
        senha:''
    }

    errorMessage: string | null = null;

    constructor(
      private service: LoginService,
      private router: Router
    ) { }

    login(): void{
      
        const nome = this.loginForm.nome;
        const senha = this.loginForm.senha;

        if(!nome || !senha) {
          alert("Campo obrigatório não preenchido!");
          return;
        }
        this.service.login(this.loginForm).subscribe({
          error: (err) => {
            this.errorMessage = err.error.message || "Usuário ou senha inválidos";
            console.log(this.errorMessage);            
            return
          },
          next: () => {
            const modalElement = document.getElementById('loginModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
            setTimeout(() => {
                this.router.navigate(['panel'])
            }, 300);
          }
        });
      }
}
