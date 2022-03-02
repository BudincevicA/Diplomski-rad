import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDislikedComponent } from './user-disliked.component';

describe('UserDislikedComponent', () => {
  let component: UserDislikedComponent;
  let fixture: ComponentFixture<UserDislikedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDislikedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDislikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
