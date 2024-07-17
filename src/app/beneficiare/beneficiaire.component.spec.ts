import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaireComponent } from './beneficiaire.component';

describe('BeneficiareComponent', () => {
  let component: BeneficiaireComponent;
  let fixture: ComponentFixture<BeneficiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
