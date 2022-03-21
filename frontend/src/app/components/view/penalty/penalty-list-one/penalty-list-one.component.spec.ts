import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyListOneComponent } from './penalty-list-one.component';

describe('PenaltyListOneComponent', () => {
  let component: PenaltyListOneComponent;
  let fixture: ComponentFixture<PenaltyListOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltyListOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyListOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
