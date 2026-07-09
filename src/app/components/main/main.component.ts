import { ReviewsComponent } from './../reviews/reviews.component';
import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { HeroComponent } from '../hero/hero.component';
import { CardsComponent } from '../cards/cards.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-main',
  imports: [CabecalhoComponent,HeroComponent,RodapeComponent,ReviewsComponent,CarouselComponent,CardsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
