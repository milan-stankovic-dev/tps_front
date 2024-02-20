import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonSave } from '../domain/PersonSave';
import { PersonDisplay } from '../domain/PersonDisplay';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly apiUrl:string = 'http://localhost:8080/person';

  constructor(private http:HttpClient) { }

  getAllPersons():Observable<PersonDisplay[]>{
    return this.http.get<PersonDisplay[]>(`${this.apiUrl}`);
  }

  savePerson(person:PersonSave):Observable<PersonSave>{
    alert(JSON.stringify(`${this.apiUrl}`));
    alert(JSON.stringify(person));
    return this.http.post<PersonSave>(`${this.apiUrl}`, person);
  }

  deletePersonById(id:number):Observable<never>{
    return this.http.delete<never>(`${this.apiUrl}/${id}`);
  }

  updatePerson(person:PersonSave):Observable<PersonSave>{
    return this.http.put<PersonSave>(`${this.apiUrl}`, person);
  }
}
