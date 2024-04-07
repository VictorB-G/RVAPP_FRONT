import { TestBed } from '@angular/core/testing';

import { UiSpinnerService } from './ui-spinner.service';

describe('UiSpinnerService', () => {
  let service: UiSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
