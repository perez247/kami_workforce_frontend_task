import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPlaceholderComponent } from './album-placeholder.component';

describe('AlbumPlaceholderComponent', () => {
  let component: AlbumPlaceholderComponent;
  let fixture: ComponentFixture<AlbumPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
