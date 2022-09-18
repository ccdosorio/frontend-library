import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClassroomBooksComponent } from './list-classroom-books.component';

describe('ListClassroomBooksComponent', () => {
  let component: ListClassroomBooksComponent;
  let fixture: ComponentFixture<ListClassroomBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClassroomBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClassroomBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
