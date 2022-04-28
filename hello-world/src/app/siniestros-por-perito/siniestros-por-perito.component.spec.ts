import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestrosPorPeritoComponent } from './siniestros-por-perito.component';

describe('SiniestrosPorPeritoComponent', () => {
  let component: SiniestrosPorPeritoComponent;
  let fixture: ComponentFixture<SiniestrosPorPeritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiniestrosPorPeritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiniestrosPorPeritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
