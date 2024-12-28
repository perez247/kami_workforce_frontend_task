import { Component, input } from '@angular/core';
import { PhotoModel } from '../../../../core/models/photo.model';
import { PhotoItemComponent } from '../../../../shared/components/photo-item/photo-item.component';
import { PhotoPlaceholderComponent } from '../../../../shared/components/photo-placeholder/photo-placeholder.component';

@Component({
  selector: 'app-dashboard-recent-photos',
  imports: [PhotoItemComponent, PhotoPlaceholderComponent],
  standalone: true,
  templateUrl: './dashboard-recent-photos.component.html',
  styleUrl: './dashboard-recent-photos.component.scss'
})
export class DashboardRecentPhotosComponent {
  recentPhotos = input.required<PhotoModel[]>();
  isLoading = input.required<boolean>();  
}
