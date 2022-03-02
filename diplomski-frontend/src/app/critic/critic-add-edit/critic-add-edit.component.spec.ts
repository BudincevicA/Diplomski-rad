import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticAddEditComponent } from './critic-add-edit.component';

describe('CriticAddEditComponent', () => {
  let component: CriticAddEditComponent;
  let fixture: ComponentFixture<CriticAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
