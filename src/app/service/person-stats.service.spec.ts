import { TestBed } from '@angular/core/testing';

import { PersonStatsService } from './person-stats.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MAX_HEIGHT, AVERAGE_AGE_YEARS } from '../test-data/persons';

const apiUrl: string = 'http://localhost:8080/person/stats';

fdescribe('PersonStatsService', () => {
  let service: PersonStatsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PersonStatsService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return max height in cm.', () => {
    service.getMaxHeightCm().subscribe((response: number) => {
      expect(response).toBeTruthy();
      expect(response).toEqual(MAX_HEIGHT);
    });
    const mockReq = http.expectOne(apiUrl + '/maxHeight');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(MAX_HEIGHT);
  });

  it('should return average age in years.', () => {
    service.getAverageAgeYears().subscribe((response: number) => {
      expect(response).toBeTruthy();
      expect(response).toEqual(AVERAGE_AGE_YEARS);
    });
    const mockReq = http.expectOne(apiUrl + '/averageAgeYears');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(AVERAGE_AGE_YEARS);
  });
  
});
