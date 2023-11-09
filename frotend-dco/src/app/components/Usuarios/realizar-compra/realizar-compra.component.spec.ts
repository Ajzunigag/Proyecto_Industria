import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarCompraComponent } from './realizar-compra.component';

describe('RealizarCompraComponent', () => {
  let component: RealizarCompraComponent;
  let fixture: ComponentFixture<RealizarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealizarCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
