import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalUsuariosComponent } from './principal-usuarios.component';

describe('PrincipalUsuariosComponent', () => {
  let component: PrincipalUsuariosComponent;
  let fixture: ComponentFixture<PrincipalUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
