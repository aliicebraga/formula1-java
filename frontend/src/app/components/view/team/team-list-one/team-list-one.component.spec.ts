import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListOneComponent } from './team-list-one.component';

describe('TeamListOneComponent', () => {
  let component: TeamListOneComponent;
  let fixture: ComponentFixture<TeamListOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamListOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
