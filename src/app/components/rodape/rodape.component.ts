import { Component } from '@angular/core';

@Component({
  selector: 'app-rodape',
  imports: [],
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.css'
})
export class RodapeComponent {

  voltarAoTopo() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Força o deslizamento suave
    });
  }

}
