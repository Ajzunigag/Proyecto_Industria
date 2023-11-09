import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarInfoComponent } from './actualizar-info.component';

describe('ActualizarInfoComponent', () => {
  let component: ActualizarInfoComponent;
  let fixture: ComponentFixture<ActualizarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
