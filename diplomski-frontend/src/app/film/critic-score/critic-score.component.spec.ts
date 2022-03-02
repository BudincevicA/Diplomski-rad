import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticScoreComponent } from './critic-score.component';

describe('CriticScoreComponent', () => {
  let component: CriticScoreComponent;
  let fixture: ComponentFixture<CriticScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
