import { TestBed } from '@angular/core/testing';

import { DaumAddressService } from './daum-address.service';

describe('DaumAddressService', () => {
  let service: DaumAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaumAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
