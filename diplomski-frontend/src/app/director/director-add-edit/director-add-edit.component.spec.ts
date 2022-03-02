import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorAddEditComponent } from './director-add-edit.component';

describe('DirectorAddEditComponent', () => {
  let component: DirectorAddEditComponent;
  let fixture: ComponentFixture<DirectorAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
