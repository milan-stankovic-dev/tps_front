import { TestBed } from '@angular/core/testing';
import { PersonService } from './person.service';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PersonDisplay } from '../domain/PersonDisplay';
import { PERSONS, PERSON_SAVE, PERSON_UPDATE } from '../test-data/persons';
import { PersonSave } from '../domain/PersonSave';

const apiUrl: string = 'http://localhost:8080/person';

describe('PersonService', () => {
  let service: PersonService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PersonService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all persons correctly', () => {
    service.getAllPersons().subscribe((response: PersonDisplay[]) => {
      expect(response).toBeTruthy();
      expect(response.length).toBe(3);

      const first_person = response.find((p) => p.id === 1);
      const second_person = response.find((p) => p.id === 2);
      const third_person = response.find((p) => p.id === 3);

      expect(first_person).toBe(PERSONS[0]);
      expect(second_person).toBe(PERSONS[1]);
      expect(third_person).toBe(PERSONS[2]);
    });
    const mockReq = http.expectOne(apiUrl);
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(PERSONS);
  });

  it('should save a person', () => {
    service.savePerson(PERSON_SAVE).subscribe((response: PersonSave) => {
      expect(response).toBeTruthy();
      expect(response).toEqual(PERSON_SAVE);
    });
    const mockReq = http.expectOne(apiUrl);
    expect(mockReq.request.method).toEqual('POST');
    mockReq.flush(PERSON_SAVE);
  });

  it('should update a person', () => {
    service.updatePerson(PERSON_UPDATE).subscribe((response: PersonSave) => {
      expect(response).toBeTruthy();
      expect(response).toEqual(PERSON_UPDATE);
    });
    const mockReq = http.expectOne(apiUrl);
    expect(mockReq.request.method).toEqual('PUT');
    mockReq.flush(PERSON_UPDATE);
  });

  it('should delete a person', () => {
    service.deletePersonById(1).subscribe((response : undefined) => {
      expect(response).toBeFalsy(); 
    });
    const mockReq = http.expectOne(apiUrl + "/1");
    expect(mockReq.request.method).toEqual('DELETE');
    mockReq.flush(null, {status: 204, statusText: 'No Content'});
  });

  afterEach(() => {
    http.verify();
  });

});
