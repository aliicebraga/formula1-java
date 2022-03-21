import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyListAllComponent } from './penalty-list-all.component';

describe('PenaltyListAllComponent', () => {
  let component: PenaltyListAllComponent;
  let fixture: ComponentFixture<PenaltyListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltyListAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
