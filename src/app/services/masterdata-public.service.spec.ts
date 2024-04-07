import { TestBed } from '@angular/core/testing';

import { MasterdataPublicService } from './masterdata-public.service';

describe('MasterdataPublicService', () => {
  let service: MasterdataPublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterdataPublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
