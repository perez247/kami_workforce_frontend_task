import { Component, input } from '@angular/core';
import { PostModel } from '../../../../core/models/post.model';
import { PostItemComponent } from '../../../../shared/components/post-item/post-item.component';
import { PostPlaceholderComponent } from '../../../../shared/components/post-placeholder/post-placeholder.component';

@Component({
  selector: 'app-user-posts',
  imports: [PostItemComponent, PostPlaceholderComponent],
  standalone: true,
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss'
})
export class UserPostsComponent {
  posts = input.required<PostModel[]>();
  isLoading = input.required<boolean>();
}
