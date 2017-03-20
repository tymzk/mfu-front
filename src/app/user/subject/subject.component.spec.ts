import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubjectComponent } from './subject.component';

describe('SubjectListComponent', () => {
  let component: UserSubjectComponent;
  let fixture: ComponentFixture<UserSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
