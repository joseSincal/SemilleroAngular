import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestroPageComponent } from './siniestro-page.component';

describe('SiniestroPageComponent', () => {
  let component: SiniestroPageComponent;
  let fixture: ComponentFixture<SiniestroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiniestroPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiniestroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
