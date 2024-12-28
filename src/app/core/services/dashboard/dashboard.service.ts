import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { delay, Observable, of } from 'rxjs';
import { DashboardModel } from '../../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() { }

  getStats(): Observable<DashboardModel> {
    return of<DashboardModel>({ 
      posts: Math.floor(Math.random() * 101) + 10, 
      albums: Math.floor(Math.random() * 101) + 10, 
      photos: Math.floor(Math.random() * 101) + 10
    }).pipe(delay(1500));
  }
}
