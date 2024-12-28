import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentPhotosComponent } from './dashboard-recent-photos.component';

describe('DashboardRecentPhotosComponent', () => {
  let component: DashboardRecentPhotosComponent;
  let fixture: ComponentFixture<DashboardRecentPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRecentPhotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRecentPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
