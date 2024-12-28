import { Component, inject, OnInit } from '@angular/core';
import { AlbumViewModel } from '../../../core/view-models/album-view.model';
import { AlbumItemComponent } from '../../../shared/components/album-item/album-item.component';
import { AlbumPlaceholderComponent } from '../../../shared/components/album-placeholder/album-placeholder.component';
import { Router } from '@angular/router';
import { ngxRoutes } from '../../../app.routes';
import { GoBackComponent } from "../../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-album-detail',
  imports: [AlbumItemComponent, AlbumPlaceholderComponent, GoBackComponent],
  standalone: true,
  providers: [AlbumViewModel],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss'
})
export class AlbumDetailComponent  implements OnInit {
  vm = inject(AlbumViewModel);
  router = inject(Router)
  routes = ngxRoutes

  ngOnInit(): void {
    const value = Number.parseInt(this.routes.singlePhoto.params.id.snapshotValue());
    if (isNaN(value)) { this.router.navigate(['/' + this.routes.photos.fn()]); return; }
    this.vm.fetchOneResult(value);
  }
}
