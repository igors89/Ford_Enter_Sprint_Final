import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { HeroComponent } from '../hero/hero.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { EspecialidadesComponent } from '../especialidades/especialidades.component';
import { FuncionamentoComponent } from '../funcionamento/funcionamento.component';

@Component({
  selector: 'app-main',
  imports: [CabecalhoComponent,HeroComponent,RodapeComponent,CarouselComponent,EspecialidadesComponent,FuncionamentoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

    ngOnInit(): void {
        sessionStorage.clear()
    }

}
