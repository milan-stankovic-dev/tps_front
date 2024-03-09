import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonDisplay } from '../domain/PersonDisplay';

@Injectable({
  providedIn: 'root'
})
export class PersonViewService {
  private readonly apiUrl:string = 'http://localhost:8080/person/views';

  constructor(private http:HttpClient) { }

  getAllSmederevci():Observable<PersonDisplay[]> {
    return this.http.get<PersonDisplay[]>(`${this.apiUrl}/smederevo`);
  }

  getAllAdults():Observable<PersonDisplay[]> {
    return this.http.get<PersonDisplay[]>(`${this.apiUrl}/adults`);
  }
}
