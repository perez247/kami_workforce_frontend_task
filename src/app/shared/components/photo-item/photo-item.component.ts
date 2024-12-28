import { Component, input } from '@angular/core';
import { PhotoModel } from '../../../core/models/photo.model';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ngxRoutes } from '../../../app.routes';

@Component({
  selector: 'app-photo-item',
  imports: [NgClass, RouterLink],
  standalone: true,
  templateUrl: './photo-item.component.html',
  styleUrl: './photo-item.component.scss'
})
export class PhotoItemComponent {
  photo = input.required<PhotoModel>();
  isDetail = input<boolean>(false);

  isLoading: boolean = true;
  routes = ngxRoutes;
}
