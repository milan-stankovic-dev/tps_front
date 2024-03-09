import { TestBed } from '@angular/core/testing';

import { PersonViewService } from './person-view.service';

describe('PersonViewService', () => {
  let service: PersonViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
