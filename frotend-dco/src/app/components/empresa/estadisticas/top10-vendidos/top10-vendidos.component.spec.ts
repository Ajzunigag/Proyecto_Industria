import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10VendidosComponent } from './top10-vendidos.component';

describe('Top10VendidosComponent', () => {
  let component: Top10VendidosComponent;
  let fixture: ComponentFixture<Top10VendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Top10VendidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top10VendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
