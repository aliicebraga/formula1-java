import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EListOneComponent } from './e-list-one.component';

describe('EListOneComponent', () => {
  let component: EListOneComponent;
  let fixture: ComponentFixture<EListOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EListOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EListOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
