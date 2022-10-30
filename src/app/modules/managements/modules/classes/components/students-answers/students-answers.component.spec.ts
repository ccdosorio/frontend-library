import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAnswersComponent } from './students-answers.component';

describe('StudentsAnswersComponent', () => {
  let component: StudentsAnswersComponent;
  let fixture: ComponentFixture<StudentsAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
