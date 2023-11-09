import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalUsuariosAutenticadoComponent } from './principal-usuarios-autenticado.component';

describe('PrincipalUsuariosAutenticadoComponent', () => {
  let component: PrincipalUsuariosAutenticadoComponent;
  let fixture: ComponentFixture<PrincipalUsuariosAutenticadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalUsuariosAutenticadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalUsuariosAutenticadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
