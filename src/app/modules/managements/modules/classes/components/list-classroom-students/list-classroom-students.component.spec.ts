import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClassroomStudentsComponent } from './list-classroom-students.component';

describe('ListClassroomStudentsComponent', () => {
  let component: ListClassroomStudentsComponent;
  let fixture: ComponentFixture<ListClassroomStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClassroomStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClassroomStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
