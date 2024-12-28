import { inject, Injectable } from "@angular/core";
import { LookupModel } from "../models/lookup.model";
import { BaseViewModel } from "./base-view.model";
import { BaseService } from "../services/base/base.service";
import { PhotoModel } from "../models/photo.model";
import { PhotoService } from "../services/photo/photo.service";

@Injectable()
export class PhotoViewModel extends BaseViewModel<PhotoModel> {
    protected override service: BaseService<PhotoModel> = inject(PhotoService);
    pageName = 'Photo List Page';
    sort: LookupModel<string>[] = [
        { label: 'Id', value: 'id' }, 
        { label: 'Title', value: 'title' },
        { label: 'Album Id', value: 'albumId' },
    ]
}