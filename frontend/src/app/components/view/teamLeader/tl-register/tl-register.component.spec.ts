import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlRegisterComponent } from './tl-register.component';

describe('TlRegisterComponent', () => {
  let component: TlRegisterComponent;
  let fixture: ComponentFixture<TlRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TlRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
