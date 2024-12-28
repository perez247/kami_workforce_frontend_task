import { Component, inject, OnInit } from '@angular/core';
import { ngxRoutes } from '../../../app.routes';
import { Router } from '@angular/router';
import { PhotoItemComponent } from "../../../shared/components/photo-item/photo-item.component";
import { PhotoViewModel } from '../../../core/view-models/photo-view.model';
import { PhotoPlaceholderComponent } from '../../../shared/components/photo-placeholder/photo-placeholder.component';
import { GoBackComponent } from '../../../shared/components/go-back/go-back.component';

@Component({
  selector: 'app-photo-detail',
  imports: [PhotoItemComponent, PhotoPlaceholderComponent, GoBackComponent],
  standalone: true,
  providers: [PhotoViewModel],
  templateUrl: './photo-detail.component.html',
  styleUrl: './photo-detail.component.scss'
})
export class PhotoDetailComponent implements OnInit {
  vm = inject(PhotoViewModel);
  router = inject(Router)
  routes = ngxRoutes

  ngOnInit(): void {
    const value = Number.parseInt(this.routes.singlePhoto.params.id.snapshotValue());
    if (isNaN(value)) { this.router.navigate(['/' + this.routes.photos.fn()]); return; }
    this.vm.fetchOneResult(value);
  }
}
