import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsBookComponent } from './questions-book.component';

describe('QuestionsBookComponent', () => {
  let component: QuestionsBookComponent;
  let fixture: ComponentFixture<QuestionsBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
