import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleListAllComponent } from './role-list-all.component';

describe('RoleListAllComponent', () => {
  let component: RoleListAllComponent;
  let fixture: ComponentFixture<RoleListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleListAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
