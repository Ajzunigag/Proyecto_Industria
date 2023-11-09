import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmpresasComponent } from './admin-empresas.component';

describe('AdminEmpresasComponent', () => {
  let component: AdminEmpresasComponent;
  let fixture: ComponentFixture<AdminEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmpresasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
