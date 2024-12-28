import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { DashboardModel } from '../../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getStats(): Observable<DashboardModel> {
    return of<DashboardModel>({ 
      posts: Math.floor(Math.random() * 101) + 10, 
      albums: Math.floor(Math.random() * 101) + 10, 
      photos: Math.floor(Math.random() * 101) + 10
    }).pipe(delay(1500));
  }
}
