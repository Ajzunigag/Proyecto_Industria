import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarUsuarioComponent } from './iniciar-usuario.component';

describe('IniciarUsuarioComponent', () => {
  let component: IniciarUsuarioComponent;
  let fixture: ComponentFixture<IniciarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
