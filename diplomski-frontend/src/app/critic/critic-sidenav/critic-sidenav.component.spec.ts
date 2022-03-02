import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticSidenavComponent } from './critic-sidenav.component';

describe('CriticSidenavComponent', () => {
  let component: CriticSidenavComponent;
  let fixture: ComponentFixture<CriticSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
