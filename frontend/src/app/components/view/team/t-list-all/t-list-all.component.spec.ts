import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TListAllComponent } from './t-list-all.component';

describe('TListAllComponent', () => {
  let component: TListAllComponent;
  let fixture: ComponentFixture<TListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TListAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
