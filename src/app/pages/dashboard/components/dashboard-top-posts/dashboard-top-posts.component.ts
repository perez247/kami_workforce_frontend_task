import { Component, input } from '@angular/core';
import { PostModel } from '../../../../core/models/post.model';
import { PostItemComponent } from "../../../../shared/components/post-item/post-item.component";
import { PostPlaceholderComponent } from "../../../../shared/components/post-placeholder/post-placeholder.component";

@Component({
  selector: 'app-dashboard-top-posts',
  imports: [PostItemComponent, PostPlaceholderComponent],
  standalone: true,
  templateUrl: './dashboard-top-posts.component.html',
  styleUrl: './dashboard-top-posts.component.scss'
})
export class DashboardTopPostsComponent {
    topPosts = input.required<PostModel[]>();
    isLoading = input.required<boolean>(); 
}
