import { inject, Injectable, OnDestroy, signal } from "@angular/core";
import { PhotoService } from "../services/photo/photo.service";
import { PostService } from "../services/post/post.service";
import { finalize, forkJoin, Subject, takeUntil } from "rxjs";
import { DashboardModel } from "../models/dashboard.model";
import { PhotoModel } from "../models/photo.model";
import { PostModel } from "../models/post.model";
import { DashboardService } from "../services/dashboard/dashboard.service";

@Injectable()
export class DashboardViewModel implements OnDestroy {
  private destroy$ = new Subject<void>()

  private dashboardService = inject(DashboardService);
  private postService = inject(PostService);
  private photoService = inject(PhotoService);

  readonly stats = signal<DashboardModel>({ posts: 0, photos: 0, albums: 0 });
  readonly recentPhotos = signal<PhotoModel[]>([]);
  readonly topPosts = signal<PostModel[]>([]);
  readonly isLoading = signal(true);

  public initializeValues(): void {
    this.isLoading.set(true);
    forkJoin({
      stats: this.dashboardService.getStats(),
      posts: this.postService.topPosts(Math.floor(Math.random() * 50) + 10),
      photos: this.photoService.recentPhotos(Math.floor(Math.random() * 50) + 10),
    }).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: ({ posts, photos, stats }) => {
        // Update stats
        this.stats.set(stats);

        // Update recent photos
        this.recentPhotos.set(photos);

        // Update top posts
        this.topPosts.set(posts);
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading.set(false);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}