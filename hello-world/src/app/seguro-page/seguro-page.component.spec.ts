import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroPageComponent } from './seguro-page.component';

describe('SeguroPageComponent', () => {
  let component: SeguroPageComponent;
  let fixture: ComponentFixture<SeguroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguroPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
