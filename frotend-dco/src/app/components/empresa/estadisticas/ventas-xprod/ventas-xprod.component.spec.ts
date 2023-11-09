import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasXprodComponent } from './ventas-xprod.component';

describe('VentasXprodComponent', () => {
  let component: VentasXprodComponent;
  let fixture: ComponentFixture<VentasXprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasXprodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasXprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
