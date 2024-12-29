import { Component, signal } from '@angular/core';
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  sidebarState = signal(false);
  
  toggleSidebar(state: boolean) {
    this.sidebarState.set(state);
  }
}
