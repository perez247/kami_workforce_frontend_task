import { inject, Injectable } from "@angular/core";
import { LookupModel } from "../models/lookup.model";
import { BaseViewModel } from "./base-view.model";
import { BaseService } from "../services/base/base.service";
import { AlbumModel } from "../models/album.model";
import { AlbumService } from "../services/album/album.service";

@Injectable()
export class AlbumViewModel extends BaseViewModel<AlbumModel> {
    protected override service: BaseService<AlbumModel> = inject(AlbumService);
    pageName = 'Album List Page';
    sort: LookupModel<string>[] = [{ label: 'Id', value: 'id' }, { label: 'Title', value: 'title' }]
}