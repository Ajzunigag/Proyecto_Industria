import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductoAutenticadoComponent } from './ver-producto-autenticado.component';

describe('VerProductoAutenticadoComponent', () => {
  let component: VerProductoAutenticadoComponent;
  let fixture: ComponentFixture<VerProductoAutenticadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProductoAutenticadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerProductoAutenticadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
