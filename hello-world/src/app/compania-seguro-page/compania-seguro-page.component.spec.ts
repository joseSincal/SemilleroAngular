import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniaSeguroPageComponent } from './compania-seguro-page.component';

describe('CompaniaSeguroPageComponent', () => {
  let component: CompaniaSeguroPageComponent;
  let fixture: ComponentFixture<CompaniaSeguroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniaSeguroPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniaSeguroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
