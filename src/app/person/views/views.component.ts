import { Component } from '@angular/core';
import { PersonDisplay } from 'src/app/domain/PersonDisplay';
import { Observable } from 'rxjs';
import { PersonViewService } from 'src/app/service/person-view.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent {
  smederevci: PersonDisplay[] = [];
  adults: PersonDisplay[] = [];

  constructor(private personViewService: PersonViewService) { }

  ngOnInit() {
    this.makeApiCall(this.personViewService.getAllSmederevci).subscribe(
      persons => this.smederevci = persons,
      error => console.error('Error', error)
    );

    this.makeApiCall(this.personViewService.getAllAdults).subscribe(
      persons => this.adults = persons,
      error => console.error('Error', error)
    );
  }

  makeApiCall(apiCallFunction: () => Observable<PersonDisplay[]>): Observable<PersonDisplay[]> {
    return apiCallFunction.bind(this.personViewService)();
  }
}
