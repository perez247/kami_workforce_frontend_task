import { Component, input } from '@angular/core';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-personal-information',
  imports: [],
  standalone: true,
  templateUrl: './user-personal-information.component.html',
  styleUrl: './user-personal-information.component.scss'
})
export class UserPersonalInformationComponent {
  user = input.required<UserModel | undefined>();
  isLoading = input.required<boolean>();
}
