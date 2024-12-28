import { Component, input } from '@angular/core';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-display',
  imports: [],
  standalone: true,
  templateUrl: './user-display.component.html',
  styleUrl: './user-display.component.scss'
})
export class UserDisplayComponent {
  user = input.required<UserModel | undefined>();
  isLoading = input.required<boolean>();
}
