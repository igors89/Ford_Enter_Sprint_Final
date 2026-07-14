import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ApiReviews, Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-carousel',
  imports: [NgFor],
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

        for (let i = 0; i < data.length; i += grupo) {
            this.gruposAvaliacoes.push(data.slice(i, i + grupo));
        }
    }

    carregarReviews(): void {
        this.reviewServ.getReviews().subscribe((avaliacoes: ApiReviews) => {
            this.agruparAvaliacoes(avaliacoes.reviews);
        });
    }

}
