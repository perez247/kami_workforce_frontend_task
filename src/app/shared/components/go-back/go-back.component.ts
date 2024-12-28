import { Component } from '@angular/core';

@Component({
  selector: 'app-go-back',
  imports: [],
  standalone: true,
  templateUrl: './go-back.component.html',
  styleUrl: './go-back.component.scss'
})
export class GoBackComponent {

  // TODO: Kindly use a service for this
  // to identify if its a mobile application
  goBack(): void {
    window.history.back();
  }
}
