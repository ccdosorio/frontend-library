import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassroomBookComponent } from './create-classroom-book.component';

describe('CreateClassroomBookComponent', () => {
  let component: CreateClassroomBookComponent;
  let fixture: ComponentFixture<CreateClassroomBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClassroomBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClassroomBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
