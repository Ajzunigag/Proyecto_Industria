import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNuevoUsuarioComponent } from './admin-nuevo-usuario.component';

describe('AdminNuevoUsuarioComponent', () => {
  let component: AdminNuevoUsuarioComponent;
  let fixture: ComponentFixture<AdminNuevoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNuevoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNuevoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
