import { Component, input } from '@angular/core';
import { DashboardModel } from '../../../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-stats.component.html',
  styleUrl: './dashboard-stats.component.scss'
})
export class DashboardStatsComponent {
  stats = input.required<DashboardModel>();
  isLoading = input.required<boolean>();
}
