import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTopicAddEditComponent } from './forum-topic-add-edit.component';

describe('ForumTopicAddEditComponent', () => {
  let component: ForumTopicAddEditComponent;
  let fixture: ComponentFixture<ForumTopicAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumTopicAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumTopicAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
