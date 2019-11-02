import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizProgramComponent } from './quiz-program.component';

describe('QuizProgramComponent', () => {
  let component: QuizProgramComponent;
  let fixture: ComponentFixture<QuizProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
