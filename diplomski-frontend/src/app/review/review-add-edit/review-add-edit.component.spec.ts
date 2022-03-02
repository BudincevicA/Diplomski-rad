import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAddEditComponent } from './review-add-edit.component';

describe('ReviewAddEditComponent', () => {
  let component: ReviewAddEditComponent;
  let fixture: ComponentFixture<ReviewAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
