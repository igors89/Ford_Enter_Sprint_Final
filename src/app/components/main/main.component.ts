import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-main',
  imports: [CabecalhoComponent,HeroComponent,RodapeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
