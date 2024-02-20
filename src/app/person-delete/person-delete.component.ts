import { Component, OnInit } from '@angular/core';
import { PersonDisplay } from '../domain/PersonDisplay';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-person-delete',
  templateUrl: './person-delete.component.html',
  styleUrls: ['./person-delete.component.css']
})
export class PersonDeleteComponent implements OnInit{
  persons: PersonDisplay[] = [];
  selectedId: number|null = null;

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

  deletePersonByID(id: number | null):void {
    if(id == null){
      alert("You need to select a person for deletion.");
      return;
    }

    const userConfirmed = window.confirm("Are you sure you want to " + 
    "delete this user? This cannot be undone.");

    if(userConfirmed){
      this.personService.deletePersonById(id).subscribe((response)=>{
        this.removePersonLocallyByID(id);
        alert("Deleted successfully!");
      },
      (error) => {
        alert("ERROR " + JSON.stringify(error.error));
        console.log(error.error);
      });
    }
  }

  removePersonLocallyByID(id: number | null):void{
    if(id == null){
      return;
    }
    
    this.persons = this.persons.filter((person)=> person.id != id);
  }
}
