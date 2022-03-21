import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleListRegisterComponent } from './role-list-register.component';

describe('RoleListRegisterComponent', () => {
  let component: RoleListRegisterComponent;
  let fixture: ComponentFixture<RoleListRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleListRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
