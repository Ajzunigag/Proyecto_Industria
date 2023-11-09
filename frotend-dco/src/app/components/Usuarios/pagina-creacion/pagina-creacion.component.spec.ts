import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCreacionComponent } from './pagina-creacion.component';

describe('PaginaCreacionComponent', () => {
  let component: PaginaCreacionComponent;
  let fixture: ComponentFixture<PaginaCreacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaCreacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCreacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
