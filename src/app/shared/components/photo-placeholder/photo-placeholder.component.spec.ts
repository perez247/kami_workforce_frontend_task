import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoPlaceholderComponent } from './photo-placeholder.component';

describe('PhotoPlaceholderComponent', () => {
  let component: PhotoPlaceholderComponent;
  let fixture: ComponentFixture<PhotoPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
