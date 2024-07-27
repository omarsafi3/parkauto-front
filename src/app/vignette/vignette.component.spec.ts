import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VignetteComponent } from './vignette.component';

describe('VignetteComponent', () => {
  let component: VignetteComponent;
  let fixture: ComponentFixture<VignetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VignetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
