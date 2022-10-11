import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewerClassroomComponent } from './pdf-viewer-classroom.component';

describe('PdfViewerClassroomComponent', () => {
  let component: PdfViewerClassroomComponent;
  let fixture: ComponentFixture<PdfViewerClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfViewerClassroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfViewerClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
