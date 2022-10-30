import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClassroomBookStudentsComponent } from './list-classroom-book-students.component';

describe('ListClassroomBookStudentsComponent', () => {
  let component: ListClassroomBookStudentsComponent;
  let fixture: ComponentFixture<ListClassroomBookStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClassroomBookStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClassroomBookStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
