import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgBookComponent } from './img-book.component';

describe('ImgBookComponent', () => {
  let component: ImgBookComponent;
  let fixture: ComponentFixture<ImgBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
