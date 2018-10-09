import { TestBed, inject } from '@angular/core/testing';

import { HttpserveService } from './httpserve.service';

describe('HttpserveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpserveService]
    });
  });

  it('should be created', inject([HttpserveService], (service: HttpserveService) => {
    expect(service).toBeTruthy();
  }));
});
