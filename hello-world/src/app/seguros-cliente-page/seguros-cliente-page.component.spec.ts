import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegurosClientePageComponent } from './seguros-cliente-page.component';

describe('SegurosClientePageComponent', () => {
  let component: SegurosClientePageComponent;
  let fixture: ComponentFixture<SegurosClientePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegurosClientePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegurosClientePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
