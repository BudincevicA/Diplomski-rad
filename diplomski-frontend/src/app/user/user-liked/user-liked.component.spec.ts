import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLikedComponent } from './user-liked.component';

describe('UserLikedComponent', () => {
  let component: UserLikedComponent;
  let fixture: ComponentFixture<UserLikedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLikedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
