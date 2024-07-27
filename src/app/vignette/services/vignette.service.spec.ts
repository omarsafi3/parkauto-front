import { TestBed } from '@angular/core/testing';

import { VignetteService } from './vignette.service';

describe('VignetteService', () => {
  let service: VignetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VignetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
