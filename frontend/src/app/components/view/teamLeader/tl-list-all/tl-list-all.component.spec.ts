import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlListAllComponent } from './tl-list-all.component';

describe('TlListAllComponent', () => {
  let component: TlListAllComponent;
  let fixture: ComponentFixture<TlListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlListAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TlListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
