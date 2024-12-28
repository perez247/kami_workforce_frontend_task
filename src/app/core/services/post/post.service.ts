import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from '../../models/post.model';
import { BaseService } from '../base/base.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService<PostModel> {

  protected override endpoint = 'posts';

  constructor(http: HttpClient) {
    super(http);
  }

  protected override applySearchFilter(data: PostModel[], filterTerm: string): PostModel[] {
    if (filterTerm.trim().length == 0) {
      return data;
    }

    return data.filter(x => 
      x.title.toLowerCase().includes(filterTerm.toLowerCase()) || 
      x.body.toLowerCase().includes(filterTerm.toLowerCase()) || 
      x.id.toString() === filterTerm || 
      x.userId.toString() === filterTerm
    );
  }

  topPosts(count?: number): Observable<PostModel[]> {
    return this.getCachedData().pipe(
      map(data => {
        const length = count || Math.floor(Math.random() * data.length / 2) + 1;
        return data.slice(0, length);
      })
    );
  }

  // UserId is currently not being used but will be required for real data
  userPosts(userId: number): Observable<PostModel[]> {
    return this.getCachedData().pipe(
      map(data => {
        const length = (userId * 10)/userId;
        return data.slice(0, length);
      })
    );
  }
}
