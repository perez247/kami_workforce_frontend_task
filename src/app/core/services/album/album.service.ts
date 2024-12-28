import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlbumModel } from '../../models/album.model';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseService<AlbumModel> {
    protected override endpoint: string = 'albums';
    
    constructor(http: HttpClient) {
      super(http);
    }
  
    protected override applySearchFilter(data: AlbumModel[], filterTerm: string): AlbumModel[] {
      return data.filter(x => 
        x.title.toLowerCase().includes(filterTerm.toLowerCase()) || 
        x.id.toString() ===  filterTerm
      );
    }
}
