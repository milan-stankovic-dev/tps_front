import { Component } from '@angular/core';
import { Person } from '../domain/Person';
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css',
    '../../styles.css']
})
export class PersonListComponent {
  persons:Person[]= [
    {
      id: 1,
      firstName: "Pera",
      lastName: "Peric",
      dateOfBirth: "1999/01/01",
      ageInMonths: 301
    }
  ];
}
