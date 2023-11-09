import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GananciasXcatComponent } from './ganancias-xcat.component';

describe('GananciasXcatComponent', () => {
  let component: GananciasXcatComponent;
  let fixture: ComponentFixture<GananciasXcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GananciasXcatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GananciasXcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
