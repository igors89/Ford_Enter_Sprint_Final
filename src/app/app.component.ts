import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sprint_final';

  constructor(private viewportScroller: ViewportScroller){
    this.viewportScroller.setOffset([0,50]);
  }
}
