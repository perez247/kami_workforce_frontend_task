import { Component, inject, OnInit } from '@angular/core';
import { DashboardViewModel } from '../../../core/view-models/dashboard-view.model';
import { DashboardStatsComponent } from '../components/dashboard-stats/dashboard-stats.component';
import { DashboardRecentPhotosComponent } from "../components/dashboard-recent-photos/dashboard-recent-photos.component";
import { DashboardTopPostsComponent } from "../components/dashboard-top-posts/dashboard-top-posts.component";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [DashboardStatsComponent, DashboardRecentPhotosComponent, DashboardTopPostsComponent],
  providers: [DashboardViewModel],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
  vm = inject(DashboardViewModel);

  async ngOnInit(): Promise<void> {
    this.vm.initializeValues();
  }
}
