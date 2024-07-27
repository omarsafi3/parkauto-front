import { TestBed } from '@angular/core/testing';

import { VisiteTechniqueService } from './visite-technique.service';

describe('VisiteTechniqueService', () => {
  let service: VisiteTechniqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisiteTechniqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
