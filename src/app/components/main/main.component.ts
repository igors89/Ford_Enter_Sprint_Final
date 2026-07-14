import { ReviewsComponent } from './../reviews/reviews.component';
import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { HeroComponent } from '../hero/hero.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { EspecialidadesComponent } from '../especialidades/especialidades.component';

@Component({
  selector: 'app-main',
  imports: [CabecalhoComponent,HeroComponent,RodapeComponent,ReviewsComponent,CarouselComponent,EspecialidadesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
