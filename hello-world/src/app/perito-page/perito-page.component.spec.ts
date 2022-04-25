import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeritoPageComponent } from './perito-page.component';

describe('PeritoPageComponent', () => {
  let component: PeritoPageComponent;
  let fixture: ComponentFixture<PeritoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeritoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeritoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
