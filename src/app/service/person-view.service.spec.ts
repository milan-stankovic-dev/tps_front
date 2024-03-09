import { TestBed } from '@angular/core/testing';

import { PersonViewService } from './person-view.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PersonDisplay } from '../domain/PersonDisplay';
import { ADULTS, SMEDEREVCI } from '../test-data/persons';

const apiUrl: string = 'http://localhost:8080/person/views';

fdescribe('PersonViewService', () => {
  let service: PersonViewService;
  let http: HttpTestingController; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PersonViewService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all adults correctly', () => {
    service.getAllAdults().subscribe((response: PersonDisplay[]) => {
        expect(response).toBeTruthy();
        expect(response).toEqual(ADULTS);
    });
    const mockReq = http.expectOne(apiUrl + '/adults');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(ADULTS);
  });

  it('should return all Smederevci correctly', () => {
    service.getAllSmederevci().subscribe((response: PersonDisplay[]) => {
        expect(response).toBeTruthy();
        expect(response).toEqual(SMEDEREVCI);
    });
    const mockReq = http.expectOne(apiUrl + '/smederevo');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(SMEDEREVCI);
  });
});
