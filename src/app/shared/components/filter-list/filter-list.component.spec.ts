import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterListComponent } from './filter-list.component';

describe('FilterListComponent', () => {
  let component: FilterListComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), FilterListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: jasmine.createSpy('get').and.returnValue('testSearchTerm'),
              },
              queryParams: { search: 'testSearchTerm' },
            },
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(FilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the input value from query parameters', () => {
    expect(component.input).toBe('testSearchTerm');
  });

  it('should call router.navigate when inputChanged is triggered', (done) => {
    spyOn(router, 'navigate');

    component.inputChanged('newSearchTerm');

    // Wait for the debounce timer
    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith([], {
        queryParams: { search: 'newSearchTerm' },
      });
      done();
    }, 300);
  });

  it('should debounce input changes and update query parameters', (done) => {
    spyOn(router, 'navigate');
    const searchTerms = ['term1', 'term2'];

    searchTerms.forEach(term => component.inputChanged(term));

    // Only the last value should trigger the `navigate` call
    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith([], {
        queryParams: { search: 'term2' },
      });
      done();
    }, 300);
  });

  it('should not update the query parameter if the value does not change', (done) => {
    spyOn(router, 'navigate');
    component.inputChanged('testSearchTerm'); // Same as initial value

    setTimeout(() => {
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    }, 300);
  });
});
