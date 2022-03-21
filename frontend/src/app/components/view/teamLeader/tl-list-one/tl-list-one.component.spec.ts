import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlListOneComponent } from './tl-list-one.component';

describe('TlListOneComponent', () => {
  let component: TlListOneComponent;
  let fixture: ComponentFixture<TlListOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlListOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TlListOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
