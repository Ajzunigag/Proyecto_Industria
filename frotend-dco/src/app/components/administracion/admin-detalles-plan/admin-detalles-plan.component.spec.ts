import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetallesPlanComponent } from './admin-detalles-plan.component';

describe('AdminDetallesPlanComponent', () => {
  let component: AdminDetallesPlanComponent;
  let fixture: ComponentFixture<AdminDetallesPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetallesPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetallesPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
