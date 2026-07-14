import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ApiReviews, Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carousel',
  imports: [NgFor, FormsModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit{
  
    constructor(private reviewServ: ReviewService){}

    gruposAvaliacoes: Review[][] = [];

    ngOnInit(): void {
        this.carregarReviews();
    }

    agruparAvaliacoes(data: Review[]) {
        const grupo = 3; 
        this.gruposAvaliacoes = []; // Limpa grupos antigos

        // console.log(data)
        for (let i = 0; i < data.length; i += grupo) {
            this.gruposAvaliacoes.push(data.slice(i, i + grupo));
        }
    }

    carregarReviews(): void {
        this.reviewServ.getReviews().subscribe({
            error: () => {
                alert("Erro interno! Recarregue a página ou tente novamente mais tarde!");
            },
            next: (avaliacoes: ApiReviews) => {
                console.log('avaliacoes: '+avaliacoes.reviews)
                this.agruparAvaliacoes(avaliacoes.reviews)
            }
        });
    }

    suaFuncaoDeSalvar(dadosDoFormulario: any) {
        console.log("Dados recebidos do modal:", dadosDoFormulario);
        // Aqui depois fará o POST para a sua API
    }

}
