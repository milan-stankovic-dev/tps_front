import { Component, Input, OnInit } from '@angular/core';
import { PersonDisplay } from 'src/app/domain/PersonDisplay';
import { PersonService } from 'src/app/service/person.service';

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
 
  constructor (private personService: PersonService){ }

  ngOnInit(): void {
    if(this.regularMode){
    this.personService.getAllPersons().subscribe((persons) =>{
      console.log(persons);
      this.persons = persons;
      this.filteredPersons = JSON.parse(JSON.stringify(persons));
    });
  }
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
