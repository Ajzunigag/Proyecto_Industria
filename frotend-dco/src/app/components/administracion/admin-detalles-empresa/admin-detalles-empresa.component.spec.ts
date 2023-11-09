import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetallesEmpresaComponent } from './admin-detalles-empresa.component';

describe('AdminDetallesEmpresaComponent', () => {
  let component: AdminDetallesEmpresaComponent;
  let fixture: ComponentFixture<AdminDetallesEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetallesEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetallesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
