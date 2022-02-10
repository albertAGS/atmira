import { TestBed } from '@angular/core/testing';

import { InfoPayService } from './info-pay.service';

describe('InfoPayService', () => {
  let service: InfoPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
