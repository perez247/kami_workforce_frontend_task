import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopPostsComponent } from './dashboard-top-posts.component';

describe('DashboardTopPostsComponent', () => {
  let component: DashboardTopPostsComponent;
  let fixture: ComponentFixture<DashboardTopPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTopPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTopPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
