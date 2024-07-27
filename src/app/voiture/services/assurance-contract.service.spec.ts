import { TestBed } from '@angular/core/testing';

import { AssuranceContractService } from './assurance-contract.service';

describe('AssuranceContractService', () => {
  let service: AssuranceContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssuranceContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
