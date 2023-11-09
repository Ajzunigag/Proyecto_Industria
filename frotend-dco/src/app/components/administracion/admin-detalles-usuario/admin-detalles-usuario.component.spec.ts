import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetallesUsuarioComponent } from './admin-detalles-usuario.component';

describe('AdminDetallesUsuarioComponent', () => {
  let component: AdminDetallesUsuarioComponent;
  let fixture: ComponentFixture<AdminDetallesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetallesUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetallesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
