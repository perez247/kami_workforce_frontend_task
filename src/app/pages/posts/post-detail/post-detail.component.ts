import { Component, inject } from '@angular/core';
import { PostItemComponent } from '../../../shared/components/post-item/post-item.component';
import { PostPlaceholderComponent } from '../../../shared/components/post-placeholder/post-placeholder.component';
import { PostViewModel } from '../../../core/view-models/post-view.model';
import { ngxRoutes } from '../../../app.routes';
import { Router } from '@angular/router';
import { GoBackComponent } from '../../../shared/components/go-back/go-back.component';

@Component({
  selector: 'app-post-detail',
  imports: [PostItemComponent, PostPlaceholderComponent, GoBackComponent],
  standalone: true,
  providers: [PostViewModel],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {
  vm = inject(PostViewModel);
  router = inject(Router)
  routes = ngxRoutes

  ngOnInit(): void {
    const value = Number.parseInt(this.routes.singlePost.params.id.snapshotValue());
    if (isNaN(value)) { this.router.navigate(['/' + this.routes.photos.fn()]); return; }
    this.vm.fetchOneResult(value);
  }
}
