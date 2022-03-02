import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticSubjectsComponent } from './critic-subjects.component';

describe('CriticSubjectsComponent', () => {
  let component: CriticSubjectsComponent;
  let fixture: ComponentFixture<CriticSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
