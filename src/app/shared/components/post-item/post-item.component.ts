import { Component, input } from '@angular/core';
import { PostModel } from '../../../core/models/post.model';
import { ngxRoutes } from '../../../app.routes';
import { RouterLink } from '@angular/router';
import { TrimSentencePipe } from "../../pipes/trim-sentence/trim-sentence.pipe";

@Component({
  selector: 'app-post-item',
  imports: [RouterLink, TrimSentencePipe],
  standalone: true,
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss'
})
export class PostItemComponent {
  post = input.required<PostModel>();
  isDetail = input<boolean>(false);
  routes = ngxRoutes;
}
