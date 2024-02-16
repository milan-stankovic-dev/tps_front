import { Component, OnInit } from '@angular/core';
import { PersonDisplay } from '../domain/PersonDisplay';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css',
    '../../styles.css']
})
export class PersonListComponent implements OnInit {
  
  persons:PersonDisplay[]= [
    {
      id: 1,
      firstName: "Pera",
      lastName: "Peric",
      dOB: new Date('1999-01-01'),
      ageInMonths: 301,
      cityOfBirthName: 'Zajecar',
      cityOfBirthPTBR: 11000,
      cityOfResidenceName: 'Zajecar',
      cityOfResidencePTBR: 11000
    }
  ];

  constructor (private personService: PersonService){ }

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe((persons) =>{
      console.log(persons);
      this.persons = persons;
    });
  }
}
