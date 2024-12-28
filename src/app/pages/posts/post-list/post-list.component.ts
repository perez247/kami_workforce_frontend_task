import { Component, inject } from '@angular/core';
import { PostViewModel } from '../../../core/view-models/post-view.model';
import { PostPlaceholderComponent } from '../../../shared/components/post-placeholder/post-placeholder.component';
import { PostItemComponent } from '../../../shared/components/post-item/post-item.component';
import { GenericListComponent } from "../../../shared/components/generic-list/generic-list.component";

@Component({
  selector: 'app-post-list',
  imports: [PostItemComponent, PostPlaceholderComponent, GenericListComponent],
  standalone: true,
  providers: [PostViewModel],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  vm = inject(PostViewModel);
}
