import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-insert',
  templateUrl: './person-insert.component.html',
  styleUrls: ['./person-insert.component.css']
})
export class PersonInsertComponent {
  title = 'Insert Person';
  // firstName: string = '';
  // lastName: string = '';
  // dateOfBirth: string = '';
  // age: number = 0;
  insertForm: FormGroup;


  constructor(private fb: FormBuilder){
    this.insertForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        age: [{value: '', disabled: true}]
      }
    );
  }
}