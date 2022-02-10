import { TestBed } from '@angular/core/testing';

import { GetBanksService } from './get-banks.service';

describe('GetBanksService', () => {
  let service: GetBanksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBanksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
