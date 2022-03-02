import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmTopComponent } from './film-top.component';

describe('FilmTopComponent', () => {
  let component: FilmTopComponent;
  let fixture: ComponentFixture<FilmTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
