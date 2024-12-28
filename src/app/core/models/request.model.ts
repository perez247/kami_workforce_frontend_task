import { Pagination } from "./pagination.model";

export class ApplicationRequest<T> {
    filterTerm: string = '';
    sortBy?: keyof T;
    pagination: Pagination = { pageNumber: 1, pageSize: 10 };

    constructor(filterTerm = '', sortBy?: keyof T, pagination: Pagination = { pageNumber: 1, pageSize: 10 }) {
        this.filterTerm = filterTerm;
        this.sortBy = sortBy;
        this.pagination = pagination;
    }
}
