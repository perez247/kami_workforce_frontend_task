import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { SortListComponent } from './sort-list.component';

describe('SortListComponent', () => {
  let component: SortListComponent;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), SortListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: jasmine.createSpy('get').and.callFake((param: string) => {
                  if (param === 'sort') return 'name';
                  return null;
                }),
              },
              queryParams: { sort: 'name' },
            },
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    const fixture = TestBed.createComponent(SortListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedItem from query parameters', () => {
    expect(component.selectedItem).toBe('name');
  });

  it('should update query parameters when inputSelected is called with a value', () => {
    spyOn(router, 'navigate');

    component.inputSelected('price');

    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { ...activatedRoute.snapshot.queryParams, sort: 'price' },
    });
  });

  it('should not update query parameters when inputSelected is called with an empty string', () => {
    spyOn(router, 'navigate');

    component.inputSelected('');

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not update query parameters when inputSelected is called with same selected item', () => {
    spyOn(router, 'navigate');

    component.inputSelected('name');

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should update query parameters correctly when another value is selected', () => {
    spyOn(router, 'navigate');

    component.inputSelected('date');

    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { ...activatedRoute.snapshot.queryParams, sort: 'date' },
    });
  });
});
