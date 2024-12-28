import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { SidebarService } from './core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  sidebarService = inject(SidebarService);

  ngOnInit(): void {
    if (this.isDesktop()) {
      this.sidebarService.isOpen.set(true);
    }
  }

  isDesktop(): boolean {
    return window.innerWidth > 992;
  }

  toggleSidebar(event: MouseEvent) {
    event.stopPropagation();
    this.sidebarService.toggle();
  }

  onOutsideClick() {
    if (window.innerWidth <= 992) {
      this.sidebarService.close();
    }
  }
}
