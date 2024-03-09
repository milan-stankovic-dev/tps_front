import { Component, OnInit } from '@angular/core';
import { PersonStatsService } from '../service/person-stats.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{

  maxHeightCm: number | null = null;
  averageAgeYears: number | null = null;

  constructor(private personStatsService: PersonStatsService){}

  ngOnInit() {
    this.makeApiCall(this.personStatsService.getMaxHeightCm).subscribe(
      maxHeight => this.maxHeightCm = maxHeight,
      error => console.error('Error', error)
    );

    this.makeApiCall(this.personStatsService.getAverageAgeYears).subscribe(
      averageAge => this.averageAgeYears = averageAge,
      error => console.error('Error', error)
    );
  }

  makeApiCall(apiCallFunction: () => Observable<number>): Observable<number> {
    return apiCallFunction.bind(this.personStatsService)();
  }
}
