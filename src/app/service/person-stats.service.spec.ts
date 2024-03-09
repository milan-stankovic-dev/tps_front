import { TestBed } from '@angular/core/testing';

import { PersonStatsService } from './person-stats.service';

describe('PersonStatsService', () => {
  let service: PersonStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
