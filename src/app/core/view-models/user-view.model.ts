import { inject, Injectable, OnDestroy, signal } from "@angular/core";
import { PostService } from "../services/post/post.service";
import { finalize, forkJoin, Subject, takeUntil } from "rxjs";
import { PostModel } from "../models/post.model";
import { UserService } from "../services/user/user.service";
import { UserModel } from "../models/user.model";
import { BaseViewModel } from "./base-view.model";
import { BaseService } from "../services/base/base.service";
import { LookupModel } from "../models/lookup.model";

@Injectable()
export class UserViewModel extends BaseViewModel<UserModel> implements OnDestroy {
  private destroy$ = new Subject<void>();

  
  protected override service: BaseService<UserModel> = inject(UserService);
  pageName = 'Album List Page';
  sort: LookupModel<string>[] = [
    { label: 'Id', value: 'id' }, 
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
  ]

  private postService = inject(PostService);

  readonly user = signal<UserModel | undefined>(undefined);
  readonly userPosts = signal<PostModel[]>([]);

  public fetchUserPersonalInformation(userId: number): void {
    this.isLoading.set(true);
    forkJoin({
      userPosts: this.postService.userPosts(userId),
      user: this.service.getById(userId),
    }).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: ({ userPosts, user }) => {
        // set user posts
        this.userPosts.set(userPosts);

        // set user
        this.user.set(user);
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading.set(false);
      }
    });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.destroy$.next();
    this.destroy$.complete();
  }
}