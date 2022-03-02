import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticScoresComponent } from './critic-scores.component';

describe('CriticScoresComponent', () => {
  let component: CriticScoresComponent;
  let fixture: ComponentFixture<CriticScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
