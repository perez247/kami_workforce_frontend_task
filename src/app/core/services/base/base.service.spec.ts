import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from '../../../../environments/environment';

// Test interface
interface TestItem {
  id: number;
  name: string;
  value: number;
}

// Concrete implementation for testing
class TestService extends BaseService<TestItem> {
  protected endpoint = 'test-items';

  constructor(http: HttpClient) {
    super(http);
  }

  protected applySearchFilter(data: TestItem[], filterTerm: string): TestItem[] {
    return data.filter(item => 
      item.name.toLowerCase().includes(filterTerm.toLowerCase())
    );
  }
}

describe('BaseService', () => {
  let service: TestService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  const mockData: TestItem[] = [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
    { id: 3, name: 'Test 3', value: 300 },
    { id: 4, name: 'Item 4', value: 400 },
    { id: 5, name: 'Test 5', value: 500 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestService]
    });

    service = TestBed.inject(TestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getCachedData', () => {
    it('should fetch data from API when cache is empty', (done) => {
      service['getCachedData']().subscribe(data => {
        expect(data).toEqual(mockData);
        expect(service['cachedData']).toEqual(mockData);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/test-items`);
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should return cached data when available', (done) => {
      service['cachedData'] = mockData;

      service['getCachedData']().subscribe(data => {
        expect(data).toEqual(mockData);
        done();
      });

      httpMock.expectNone(`${apiUrl}/test-items`);
    });
  });

  describe('getAll', () => {
    it('should return all items with default pagination when no request is provided', (done) => {
      service.getAll().subscribe(response => {
        expect(response.result.length).toBe(5);
        expect(response.totalItems).toBe(5);
        expect(response.pagination.pageSize).toBe(10);
        expect(response.pagination.pageNumber).toBe(1);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/test-items`);
      req.flush(mockData);
    });

    it('should apply filtering correctly', (done) => {
      const request = {
        filterTerm: 'Test',
        pagination: { pageNumber: 1, pageSize: 10 }
      };

      service.getAll(request).subscribe(response => {
        expect(response.result.length).toBe(2);
        expect(response.totalItems).toBe(2);
        expect(response.result.every(item => item.name.includes('Test'))).toBe(true);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/test-items`);
      req.flush(mockData);
    });

    it('should apply sorting correctly', (done) => {
      const request = {
        sortBy: 'value' as keyof TestItem,
        pagination: { pageNumber: 1, pageSize: 10 },
        filterTerm: ''
      };

      service.getAll(request).subscribe(response => {
        expect(response.result[0].value).toBe(100);
        expect(response.result[4].value).toBe(500);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/test-items`);
      req.flush(mockData);
    });

    it('should apply pagination correctly', (done) => {
      const request = {
        sortBy: 'value' as keyof TestItem,
        pagination: { pageNumber: 2, pageSize: 2 },
        filterTerm: ''
      };

      service.getAll(request).subscribe(response => {
        expect(response.result.length).toBe(2);
        expect(response.result[0].id).toBe(3);
        expect(response.result[1].id).toBe(4);
        expect(response.totalItems).toBe(5);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/test-items`);
      req.flush(mockData);
    });
  });

  describe('getById', () => {
    it('should fetch item by id', (done) => {
      const testId = 1;
      const testItem = mockData[0];

      service.getById(testId).subscribe(item => {
        expect(item).toEqual(testItem);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/test-items/${testId}`);
      expect(req.request.method).toBe('GET');
      req.flush(testItem);
    });
  });

  describe('sanitize pagination', () => {
    it('should handle invalid pageSize', (done) => {
      const request = {
        filterTerm: '',
        sortBy: 'value' as keyof TestItem,
        pagination: { pageNumber: 1, pageSize: 999 }
      };

      service.getAll(request).subscribe(response => {
        expect(response.pagination.pageSize).toBe(10);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/test-items`);
      req.flush(mockData);
    });

    it('should handle invalid pageNumber', (done) => {
      const request = {
        filterTerm: '',
        sortBy: 'value' as keyof TestItem,
        pagination: { pageNumber: -1, pageSize: 10 }
      };

      service.getAll(request).subscribe(response => {
        expect(response.pagination.pageNumber).toBe(1);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/test-items`);
      req.flush(mockData);
    });

    // it('should handle null pagination', (done) => {
    //   const request = {
    //     pagination: null,
    //     filterTerm: '',
    //     sortBy: 'value' as keyof TestItem,
    //   };

    //   // service.getAll(request).subscribe(response => {
    //   //   expect(response.pagination.pageNumber).toBe(1);
    //   //   expect(response.pagination.pageSize).toBe(10);
    //   //   done();
    //   // });

    //   const req = httpMock.expectOne(`${apiUrl}/test-items`);
    //   req.flush(mockData);
    // });
  });

  describe('isValidNumber', () => {
    it('should validate numbers correctly', () => {
      expect(service['isValidNumber']('123')).toBe(true);
      expect(service['isValidNumber']('abc')).toBe(false);
      expect(service['isValidNumber']('12.34')).toBe(false);
      expect(service['isValidNumber']('-1')).toBe(true);
      expect(service['isValidNumber']('0')).toBe(true);
    });
  });
});