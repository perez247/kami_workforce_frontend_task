import { Injectable } from '@angular/core';
import { PhotoModel } from '../../models/photo.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends BaseService<PhotoModel> {

    protected override endpoint: string = 'photos';
    
    constructor(http: HttpClient) {
      super(http);
    }
  
    protected override applySearchFilter(data: PhotoModel[], filterTerm: string): PhotoModel[] {
      return data.filter(x => 
        x.title.toLowerCase().includes(filterTerm.toLowerCase()) || 
        x.id.toString() ===  filterTerm || 
        x.albumId.toString() ===  filterTerm
      );
    }
  
    recentPhotos(count: number): Observable<PhotoModel[]> {
      return this.getCachedData().pipe(
        map(data => {
          return [...data].sort(() => Math.random() - 0.5).slice(0, count);
        })
      );
    }
}
