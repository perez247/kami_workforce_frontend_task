import { WritableSignal } from "@angular/core";
import { LookupModel } from "../models/lookup.model";
import { ApplicationRequest } from "../models/request.model";
import { ApplicationResponse } from "../models/response.model";

//TODO: A lot of any was used here
// Review later and fix
export interface IListViewModel {
    pageName: string;
    filter: WritableSignal<ApplicationRequest<any>>
    sort: LookupModel<string>[]
    readonly response: WritableSignal<ApplicationResponse<any>>
}