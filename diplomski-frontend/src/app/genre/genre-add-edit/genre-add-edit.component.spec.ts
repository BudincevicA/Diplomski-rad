import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAddEditComponent } from './genre-add-edit.component';

describe('GenreAddEditComponent', () => {
  let component: GenreAddEditComponent;
  let fixture: ComponentFixture<GenreAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
