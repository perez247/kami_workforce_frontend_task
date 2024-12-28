import { Component, inject } from '@angular/core';
import { PhotoViewModel } from '../../../core/view-models/photo-view.model';
import { PhotoItemComponent } from '../../../shared/components/photo-item/photo-item.component';
import { PhotoPlaceholderComponent } from '../../../shared/components/photo-placeholder/photo-placeholder.component';
import { GenericListComponent } from '../../../shared/components/generic-list/generic-list.component';

@Component({
  selector: 'app-photo-list',
  imports: [PhotoItemComponent, PhotoPlaceholderComponent, GenericListComponent],
  standalone: true,
  providers: [PhotoViewModel],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss'
})
export class PhotoListComponent {
  vm = inject(PhotoViewModel);
}
