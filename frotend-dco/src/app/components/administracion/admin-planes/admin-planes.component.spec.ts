import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanesComponent } from './admin-planes.component';

describe('AdminPlanesComponent', () => {
  let component: AdminPlanesComponent;
  let fixture: ComponentFixture<AdminPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlanesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
