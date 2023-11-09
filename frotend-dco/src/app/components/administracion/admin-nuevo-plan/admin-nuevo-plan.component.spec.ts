import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNuevoPlanComponent } from './admin-nuevo-plan.component';

describe('AdminNuevoPlanComponent', () => {
  let component: AdminNuevoPlanComponent;
  let fixture: ComponentFixture<AdminNuevoPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNuevoPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNuevoPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
