import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaVerCreacionComponent } from './pagina-ver-creacion.component';

describe('PaginaVerCreacionComponent', () => {
  let component: PaginaVerCreacionComponent;
  let fixture: ComponentFixture<PaginaVerCreacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaVerCreacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaVerCreacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
