import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmAddEditComponent } from './film-add-edit.component';

describe('FilmAddEditComponent', () => {
  let component: FilmAddEditComponent;
  let fixture: ComponentFixture<FilmAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
