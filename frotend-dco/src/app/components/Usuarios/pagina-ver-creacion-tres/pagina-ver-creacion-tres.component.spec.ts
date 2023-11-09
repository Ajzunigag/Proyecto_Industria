import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaVerCreacionTresComponent } from './pagina-ver-creacion-tres.component';

describe('PaginaVerCreacionTresComponent', () => {
  let component: PaginaVerCreacionTresComponent;
  let fixture: ComponentFixture<PaginaVerCreacionTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaVerCreacionTresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaVerCreacionTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
