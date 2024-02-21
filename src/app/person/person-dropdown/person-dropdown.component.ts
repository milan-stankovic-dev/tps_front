import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonDisplay } from '../../domain/PersonDisplay';
import { PersonService } from '../../service/person.service';
import { personDisplayToSave } from 'src/app/converter/personConverter';

@Component({
  selector: 'app-person-dropdown',
  templateUrl: './person-dropdown.component.html',
  styleUrls: ['./person-dropdown.component.css']
})
export class PersonDropdownComponent implements OnInit{
  persons: PersonDisplay[] = [];
  selectedId: number|undefined = undefined;
  @Input() mode:string = 'delete';
  personDisplayToSave: Function = personDisplayToSave;
  
  constructor(private personService:
     PersonService) { }

  fetchAllUsersAPICall() : void {
    this.personService.getAllPersons().subscribe((response) =>{
      this.persons = response;
    },
    (error) => {
      alert("ERROR OCCURED.");
      console.log(error.error);
    })
  }

  ngOnInit(): void {
    this.fetchAllUsersAPICall();
  }

  deletePersonByID(id: number | undefined):void {
    if(id === undefined){
      alert("You need to select a person for deletion.");
      return;
    }

    const userConfirmed = window.confirm("Are you sure you want to " + 
    "delete this user? This cannot be undone.");

    if(userConfirmed){
      this.personService.deletePersonById(id).subscribe((response)=>{
        this.persons = this.filterPersonsBy(id, 
          (deletedId, currentId) => deletedId != currentId);
        this.selectedId = undefined;
        alert("Deleted successfully!");
      },
      (error) => {
        alert("ERROR " + JSON.stringify(error.error));
        console.log(error.error);
      });
    }
  }

  filterPersonsBy(id: number | undefined,
         comparison: (a:number, b:number) => boolean):PersonDisplay[] {
    if(id == undefined) {
      return this.persons;
    }
    return this.persons.filter((person)=> comparison(person.id, id));
  }
  
  findByIdLocally(id:number | undefined): PersonDisplay[] {
    if(id == undefined){
      return [];
    }
    return this.filterPersonsBy(id,
       (wantedID, currentID) => wantedID == currentID);
  }

  onPersonUpdated(updated:boolean):void{
    if(updated){
      this.fetchAllUsersAPICall();
    }
  }
}
