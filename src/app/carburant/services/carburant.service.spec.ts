import { TestBed } from '@angular/core/testing';

import { CarburantService } from './carburant.service';

describe('CarburantService', () => {
  let service: CarburantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarburantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
