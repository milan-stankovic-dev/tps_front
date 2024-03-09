import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonStatsService {
  private readonly apiUrl:string = "http://localhost:8080/person/stats";

  constructor(private http:HttpClient) { }

  getMaxHeightCm():Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/maxHeight`);
  }

  getAverageAgeYears():Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/averageAgeYears`);
  }
}
