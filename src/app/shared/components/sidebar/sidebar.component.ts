import { ChangeDetectionStrategy, Component, HostListener, inject, input, model, output } from '@angular/core';
import { ngxRoutes } from '../../../app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  routes = ngxRoutes;

  sidebarService = inject(SidebarService);

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth <= 992) {
      this.sidebarService.close();
    }
  }
}
