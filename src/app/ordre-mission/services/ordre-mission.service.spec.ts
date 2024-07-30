import { TestBed } from '@angular/core/testing';

import { OrdreMissionService } from './ordre-mission.service';

describe('OrdreMissionService', () => {
  let service: OrdreMissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdreMissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
