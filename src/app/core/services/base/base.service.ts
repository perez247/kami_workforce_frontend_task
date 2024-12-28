import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApplicationRequest } from '../../models/request.model';
import { environment } from '../../../../environments/environment';
import { Pagination } from '../../models/pagination.model';
import { ApplicationResponse } from '../../models/response.model';

@Injectable()
export abstract class BaseService<T> {

  protected apiUrl = environment.apiUrl;
  protected abstract endpoint: string;
  private cachedData: T[] = [];

  constructor(protected http: HttpClient) {}

  protected get baseUrl(): string {
    return `${this.apiUrl}/${this.endpoint}`;
  }

  protected getCachedData(): Observable<T[]> {
    return this.cachedData.length > 0 
      ? of(this.cachedData) 
      : this.http.get<T[]>(this.baseUrl).pipe(
          tap(data => this.cachedData = data)
        );
  }

  getAll(request?: ApplicationRequest<T>): Observable<ApplicationResponse<T[]>> {
    return this.getCachedData().pipe(
      map(data => this.applyFilters(data, request))
    );
  }

  getById(id: number): Observable<T | undefined> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  private applyFilters(data: T[], request?: ApplicationRequest<T>): ApplicationResponse<T[]> {
    if (!request) return this.applyPagination(data, { pageNumber: 1, pageSize: 10 });

    let filteredData = [...data];

    if (request.filterTerm?.trim().length > 0) {
      filteredData = this.applySearchFilter(filteredData, request.filterTerm);
    }

    if (request.sortBy) {
      filteredData = this.applySorting(filteredData, request.sortBy);
    }

    return this.applyPagination(filteredData, request.pagination);
  }

  protected abstract applySearchFilter(data: T[], filterTerm: string): T[];

  private applySorting(data: T[], sortBy: keyof T): T[] {
    return data.sort((a, b) => 
      (a[sortBy] > b[sortBy] ? 1 : -1)
    );
  }

  private applyPagination(data: T[], pagination: Pagination): ApplicationResponse<T[]> {
    pagination = this.sanitize(pagination);
    const start = (pagination.pageNumber - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;

    return new ApplicationResponse(data.slice(start, end), data.length, pagination);

  }

  private sanitize(pagination: Pagination): Pagination {
    if (!pagination) {
        pagination = {
            pageSize: 10,
            pageNumber: 1
        }
    }
    try {
        // Ensure pageSize is a valid number and greater than 0
        if (!this.isValidNumber(pagination.pageSize) || pagination.pageSize < 1 || pagination.pageSize > 50) {
            pagination.pageSize = 10;
        }
    } catch (error) {
        pagination.pageSize = 10;
    }

    try {
        // Ensure pageNumber is a valid number and greater than 0
        if (!this.isValidNumber(pagination.pageNumber) || pagination.pageNumber < 1) {
            pagination.pageNumber = 1;
        }
    } catch (error) {
        pagination.pageNumber = 1;
    }

    pagination.pageNumber = Number(pagination.pageNumber);
    pagination.pageSize = Number(pagination.pageSize);

    return pagination;
  }

  private isValidNumber(value: any): boolean {
    // Check if value is a number and is finite
    value = Number(value);
    return value && typeof value === 'number' && Number.isFinite(value) && Number.isInteger(value);
  }
}