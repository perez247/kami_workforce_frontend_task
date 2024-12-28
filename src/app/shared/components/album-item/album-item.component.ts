import { Component, input } from '@angular/core';
import { AlbumModel } from '../../../core/models/album.model';
import { ngxRoutes } from '../../../app.routes';
import { RouterLink } from '@angular/router';
import { TrimSentencePipe } from '../../pipes/trim-sentence/trim-sentence.pipe';

@Component({
  selector: 'app-album-item',
  imports: [RouterLink, TrimSentencePipe],
  standalone: true,
  templateUrl: './album-item.component.html',
  styleUrl: './album-item.component.scss'
})
export class AlbumItemComponent {
  album = input.required<AlbumModel>();
  isDetail = input<boolean>(false);
  routes = ngxRoutes;
}
