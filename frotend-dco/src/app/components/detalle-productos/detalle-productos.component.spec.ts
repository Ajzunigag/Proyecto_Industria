import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProductosComponent } from './detalle-productos.component';

describe('DetalleProductosComponent', () => {
  let component: DetalleProductosComponent;
  let fixture: ComponentFixture<DetalleProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
