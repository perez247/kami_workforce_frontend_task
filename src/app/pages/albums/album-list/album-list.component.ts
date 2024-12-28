import { Component, inject } from '@angular/core';
import { AlbumViewModel } from '../../../core/view-models/album-view.model';
import { AlbumItemComponent } from '../../../shared/components/album-item/album-item.component';
import { AlbumPlaceholderComponent } from '../../../shared/components/album-placeholder/album-placeholder.component';
import { GenericListComponent } from '../../../shared/components/generic-list/generic-list.component';

@Component({
  selector: 'app-album-list',
  imports: [AlbumItemComponent, AlbumPlaceholderComponent, GenericListComponent],
  standalone: true,
  providers: [AlbumViewModel],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss'
})
export class AlbumListComponent {
  vm = inject(AlbumViewModel);
}
