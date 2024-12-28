import { effect, Injectable, signal } from "@angular/core";
import { finalize } from "rxjs";
import { ApplicationRequest } from "../models/request.model";
import { ApplicationResponse } from "../models/response.model";
import { CleanUpHandler } from "../../shared/components/utils/clean-up-handler.component";
import { LookupModel } from "../models/lookup.model";
import { IListViewModel } from "../interfaces/i-listview.model";
import { BaseService } from "../services/base/base.service";

@Injectable()
export abstract class BaseViewModel<T> extends CleanUpHandler implements IListViewModel {
    abstract pageName: string;

    protected abstract service: BaseService<T>;

    readonly isLoading = signal(true);

    filter = signal<ApplicationRequest<T>>(new ApplicationRequest);

    readonly response = signal<ApplicationResponse<T[]>>(new ApplicationResponse([]));
    readonly singleResponse = signal<T | undefined>(undefined);

    abstract sort: LookupModel<string>[];


    constructor() {
        super();
        effect(() => {
            this.fetchResults(this.filter());
        });
    }

    protected fetchResults(filter: ApplicationRequest<T>) {
        this.isLoading.set(true);
        
        this.subscriptions.push(
            this.service.getAll(filter)
                .pipe(
                    finalize(() => this.isLoading.set(false))
                )
                .subscribe({
                    next: (response) => this.response.set(response),
                    error: () => this.response.set(new ApplicationResponse([]))
                })
        );
    }

    public fetchOneResult(id: number) {
        this.isLoading.set(true);
        
        this.subscriptions.push(
            this.service.getById(id)
                .pipe(
                    finalize(() => this.isLoading.set(false))
                )
                .subscribe({
                    next: (response) => this.singleResponse.set(response),
                    error: () => this.singleResponse.set(undefined)
                })
        );
    }
    
}