import { Pagination } from "./pagination.model";

export class ApplicationResponse<T> {
    totalItems = 0;
    result: T;
    pagination: Pagination = { pageNumber: 1, pageSize: 10 };

    constructor(result: T, totalItems = 1, pagination: Pagination = { pageNumber: 1, pageSize: 10 }) {
        this.totalItems = totalItems;
        this.result = result;
        this.pagination = pagination;
    }
}
