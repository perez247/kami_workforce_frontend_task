import { Component, inject, OnInit } from '@angular/core';
import { UserPersonalInformationComponent } from "../components/user-personal-information/user-personal-information.component";
import { UserPostsComponent } from "../components/user-posts/user-posts.component";
import { UserDisplayComponent } from '../components/user-display/user-display.component';
import { UserViewModel } from '../../../core/view-models/user-view.model';
import { ngxRoutes } from '../../../app.routes';
import { GoBackComponent } from '../../../shared/components/go-back/go-back.component';

@Component({
  selector: 'app-user-detail',
  imports: [UserPersonalInformationComponent, UserPostsComponent, UserDisplayComponent, GoBackComponent],
  standalone: true,
  providers: [UserViewModel],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  vm = inject(UserViewModel);
  routes = ngxRoutes;
  
  ngOnInit(): void {
    //TODO Come up with a way to throw an error
    const value = Number.parseInt(this.routes.singleUser.params.id.snapshotValue())
    const userId = isNaN(value) ? 1 : value;
    this.vm.fetchUserPersonalInformation(userId);
  }
}
