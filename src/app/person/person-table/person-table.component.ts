import { Component, Input, OnInit } from '@angular/core';
import { PersonDisplay } from 'src/app/domain/PersonDisplay';
import { PersonService } from 'src/app/service/person.service';
import * as rfdc from 'rfdc';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css',
    '../../../styles.css']
})
export class PersonTableComponent implements OnInit {
  @Input() regularMode:boolean = true;
  @Input() persons:PersonDisplay[]= [];
  @Input() title:string = 'Podaci o osobama'
  @Input() filteredPersons: PersonDisplay[] = [];
  nameSearch: string = '';
  lastNameSearch: string = '';
  @Input() displayExtras: boolean = true;
  rfdcClone = rfdc();

  constructor (private personService: PersonService){ }

  ngOnInit(): void {
    if(this.regularMode){
    this.personService.getAllPersons().subscribe((persons) =>{
      console.log(persons);
      this.persons = persons;
      this.filteredPersons = this.rfdcClone(persons);
    });
  }
  }

  filterBy(fieldName: string, searchText: string):void{ 
    if(searchText !== ''){
      this.filteredPersons = this.filteredPersons.filter((person) => {
        const fieldValue:any = (person as any)[fieldName];
        
        return fieldValue?.toString()
          ?.toLowerCase()?.includes(searchText.toLowerCase());
      });
    } else {
      this.filteredPersons = this.rfdcClone(this.persons);
    }
  }
}
