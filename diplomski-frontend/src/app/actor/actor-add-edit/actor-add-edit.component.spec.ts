import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorAddEditComponent } from './actor-add-edit.component';

describe('ActorAddEditComponent', () => {
  let component: ActorAddEditComponent;
  let fixture: ComponentFixture<ActorAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
