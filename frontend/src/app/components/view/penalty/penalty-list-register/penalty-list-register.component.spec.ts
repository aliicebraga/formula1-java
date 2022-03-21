import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyListRegisterComponent } from './penalty-list-register.component';

describe('PenaltyListRegisterComponent', () => {
  let component: PenaltyListRegisterComponent;
  let fixture: ComponentFixture<PenaltyListRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltyListRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyListRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
