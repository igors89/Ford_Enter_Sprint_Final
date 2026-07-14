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
        this.gruposAvaliacoes = [];

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
                this.agruparAvaliacoes(avaliacoes.reviews)
            }
        });
    }

    postReview(dadosDoFormulario: any) {
        console.log("Dados recebidos do modal: "+dadosDoFormulario.review);
        const payload: Omit<Review, 'id'> = {
            nome: dadosDoFormulario.nome,
            nota: Number(dadosDoFormulario.nota),
            review: dadosDoFormulario.review
        };

        this.reviewServ.postReview(payload).subscribe({
            next: (resposta) => {
                alert(resposta.message);
                this.carregarReviews(); 
            },
            error: (erro) => {
                console.error("Erro ao salvar:", erro.message);
                alert(erro.message);
            }
        });
    }

}
