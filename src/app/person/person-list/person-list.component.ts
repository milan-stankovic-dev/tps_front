import { Component, Input, OnInit } from '@angular/core';
import { PersonDisplay } from 'src/app/domain/PersonDisplay';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css',
    '../../../styles.css']
})
export class PersonListComponent implements OnInit {
  persons:PersonDisplay[]= [];
  @Input() filteredPersons: PersonDisplay[] = [];
  nameSearch: string = '';
  lastNameSearch: string = '';
  @Input() displayExtras: boolean = true;
 
  constructor (private personService: PersonService){ }

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe((persons) =>{
      console.log(persons);
      this.persons = persons;
      this.filteredPersons = JSON.parse(JSON.stringify(persons));
    });
  }

  filterBy(fieldName: string, searchText: string):void{ 
    if(searchText === ''){
      this.filteredPersons = JSON.parse(JSON.stringify(this.persons));
    } else {
      this.filteredPersons = this.filteredPersons.filter((person) => {
        const fieldValue:any = (person as any)[fieldName];
        
        return fieldValue?.toString()
          ?.toLowerCase()?.includes(searchText.toLowerCase());
      });
    }
  }
}
