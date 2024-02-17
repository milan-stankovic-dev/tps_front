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
  
  persons:PersonDisplay[]= [];

  constructor (private personService: PersonService){ }

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe((persons) =>{
      console.log(persons);
      this.persons = persons;
    });
  }
}
