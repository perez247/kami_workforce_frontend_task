import { inject, Injectable } from "@angular/core";
import { PostService } from "../services/post/post.service";
import { PostModel } from "../models/post.model";
import { LookupModel } from "../models/lookup.model";
import { BaseViewModel } from "./base-view.model";
import { BaseService } from "../services/base/base.service";

@Injectable()
export class PostViewModel extends BaseViewModel<PostModel> {
    protected override service: BaseService<PostModel> = inject(PostService);
    pageName = 'Post List Page';
    sort: LookupModel<string>[] = [{ label: 'Id', value: 'id' }, { label: 'Title', value: 'title' }]
}