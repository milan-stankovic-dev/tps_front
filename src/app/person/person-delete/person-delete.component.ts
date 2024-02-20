import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonDisplay } from '../../domain/PersonDisplay';
import { PersonService } from '../../service/person.service';

@Component({
  selector: 'app-person-delete',
  templateUrl: './person-delete.component.html',
  styleUrls: ['./person-delete.component.css']
})
export class PersonDeleteComponent implements OnInit{
  persons: PersonDisplay[] = [];
  selectedId: number|undefined = undefined;

  constructor(private personService:
     PersonService) { }

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe((response) =>{
      this.persons = response;
    },
    (error) => {
      alert("ERROR OCCURED.");
      console.log(error.error);
    })
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
}