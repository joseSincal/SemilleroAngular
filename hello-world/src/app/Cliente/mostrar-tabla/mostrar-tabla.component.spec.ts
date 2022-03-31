import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTablaComponent } from './mostrar-tabla.component';

describe('MostrarTablaComponent', () => {
  let component: MostrarTablaComponent;
  let fixture: ComponentFixture<MostrarTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
