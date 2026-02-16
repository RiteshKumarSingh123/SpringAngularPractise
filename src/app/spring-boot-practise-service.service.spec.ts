import { TestBed } from '@angular/core/testing';

import { SpringBootPractiseServiceService } from './spring-boot-practise-service.service';

describe('SpringBootPractiseServiceService', () => {
  let service: SpringBootPractiseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringBootPractiseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
