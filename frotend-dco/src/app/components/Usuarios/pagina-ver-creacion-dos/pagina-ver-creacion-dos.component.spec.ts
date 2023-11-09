import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaVerCreacionDosComponent } from './pagina-ver-creacion-dos.component';

describe('PaginaVerCreacionDosComponent', () => {
  let component: PaginaVerCreacionDosComponent;
  let fixture: ComponentFixture<PaginaVerCreacionDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaVerCreacionDosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaVerCreacionDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
