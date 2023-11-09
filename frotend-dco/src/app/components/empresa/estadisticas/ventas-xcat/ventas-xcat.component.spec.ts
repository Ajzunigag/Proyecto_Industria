import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasXcatComponent } from './ventas-xcat.component';

describe('VentasXcatComponent', () => {
  let component: VentasXcatComponent;
  let fixture: ComponentFixture<VentasXcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasXcatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasXcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
