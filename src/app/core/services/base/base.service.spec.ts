import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BaseService } from './base.service';
import { ApplicationRequest } from '../../models/request.model';
import { Pagination } from '../../models/pagination.model';
import { Injectable } from '@angular/core';

interface TestModel {
  id: number;
  name: string;
}

// Extend BaseService to expose protected methods for testing
class TestService extends BaseService<TestModel> {
  protected endpoint = 'test';

  protected applySearchFilter(data: TestModel[], filterTerm: string): TestModel[] {
    return data.filter(item => item.name.includes(filterTerm));
  }
}

@Injectable()
class TestableService extends TestService {
  public exposeGetCachedData() {
    return this.getCachedData();
  }

  public exposeApplyFilters(data: TestModel[], request?: ApplicationRequest<TestModel>) {
    return this['applyFilters'](data, request);
  }

  public exposeApplyPagination(data: TestModel[], pagination?: Pagination) {
    return this['applyPagination'](data, pagination);
  }

  public exposeSanitize(pagination?: Pagination) {
    return this['sanitize'](pagination);
  }
}

describe('BaseService', () => {
  let service: TestableService;
  let httpMock: HttpTestingController;
  const mockData: TestModel[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TestableService,
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(TestableService);
    httpMock = TestBed.inject(HttpTestingController);
    service['cachedData'] = []; // Clear cache before each test
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch data from the API if cache is empty', () => {
    service.exposeGetCachedData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should return cached data if available', () => {
    service['cachedData'] = mockData;

    service.exposeGetCachedData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    httpMock.expectNone(`${service['baseUrl']}`);
  });

  it('should get all data and apply filters, sorting, and pagination', () => {
    service['cachedData'] = mockData;

    const request: ApplicationRequest<TestModel> = {
      filterTerm: 'Item',
      sortBy: 'id',
      pagination: { pageNumber: 1, pageSize: 2 },
    };

    service.getAll(request).subscribe(response => {
      expect(response.result).toEqual(mockData.slice(0, 2));
      expect(response.totalItems).toBe(3);
    });
  });

  it('should get data by ID', () => {
    const id = 1;
    const expectedItem = mockData.find(item => item.id === id);

    service.getById(id).subscribe(data => {
      expect(data).toEqual(expectedItem);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/${id}`);
    expect(req.request.method).toBe('GET');
  });

  it('should sanitize pagination values', () => {
    const pagination: Pagination = { pageNumber: -1, pageSize: 100 };
    const sanitized = service.exposeSanitize(pagination);

    expect(sanitized.pageNumber).toBe(1);
    expect(sanitized.pageSize).toBe(10);
  });

  it('should apply filters correctly', () => {
    const request: ApplicationRequest<TestModel> = {
      filterTerm: 'Item 1',
      pagination: { pageNumber: 1, pageSize: 2 },
    };

    const filteredResponse = service.exposeApplyFilters(mockData, request);

    expect(filteredResponse.result).toEqual([{ id: 1, name: 'Item 1' }]);
    expect(filteredResponse.totalItems).toBe(1);
  });

  it('should apply pagination correctly', () => {
    const pagination: Pagination = { pageNumber: 1, pageSize: 2 };
    const paginatedResponse = service.exposeApplyPagination(mockData, pagination);

    expect(paginatedResponse.result).toEqual(mockData.slice(0, 2));
    expect(paginatedResponse.totalItems).toBe(mockData.length);
  });

  it('should apply sorting correctly', () => {
    const sortedData = service['applySorting'](mockData, 'id');
    expect(sortedData).toEqual(mockData);
  });
});
