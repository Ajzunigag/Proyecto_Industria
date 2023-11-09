import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductoComponent } from './ver-producto.component';

describe('VerProductoComponent', () => {
  let component: VerProductoComponent;
  let fixture: ComponentFixture<VerProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
