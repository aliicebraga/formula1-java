import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EListAllComponent } from './e-list-all.component';

describe('EListAllComponent', () => {
  let component: EListAllComponent;
  let fixture: ComponentFixture<EListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EListAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
