import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel> {
  protected override endpoint = 'posts';

  constructor(http: HttpClient) {
    super(http);
  }

  protected override applySearchFilter(data: UserModel[], filterTerm: string): UserModel[] {
    if (filterTerm.trim().length == 0) {
      return data;
    }

    return data.filter(x => 
      x.firstName.toLowerCase().includes(filterTerm.toLowerCase()) || 
      x.lastName.toLowerCase().includes(filterTerm.toLowerCase()) || 
      x.id.toString() === filterTerm
    );
  }

  override getById(userId: number): Observable<UserModel> {
    return of<UserModel>({
      id: userId,
      firstName: 'John',
      lastName: 'Doe',
      userName: '@johndoe',
      email: 'johndoe@mail.com',
      phone: '+1234-5678-91011-1213',
      website: 'www.johndoe.com',
      company: 'JohnDoe&Sons',
      imageUrl: '/assets/images/profile.jpg',
    } as UserModel)
    .pipe(
      map((x) => new UserModel(x)),
      delay(1500)
    );
  }
}
