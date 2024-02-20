import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonSave } from 'src/app/domain/PersonSave';
import { PersonService } from 'src/app/service/person.service';
import { dateValidator } from 'src/app/validator/date.validator';
import { DATE_PATTERN, NAME_PATTERN } from '../../pattern/regexPatterns';

@Component({
  selector: 'app-person-insert',
  templateUrl: './person-insert.component.html',
  styleUrls: ['./person-insert.component.css', 
  '../../../styles.css']
})
export class PersonInsertComponent {
  title = 'Insert Person';
  insertForm: FormGroup;
  datePattern: RegExp = DATE_PATTERN;
  namePattern: RegExp = NAME_PATTERN;

  constructor(private fb: FormBuilder,
               private personService: PersonService){
    this.insertForm = this.fb.group(
      {
        firstName: ['', [Validators.required,Validators.minLength(2), 
          Validators.maxLength(30), Validators.pattern(this.namePattern)]],
        lastName: ['', [Validators.required, Validators.minLength(2),
           Validators.maxLength(30), Validators.pattern(this.namePattern)]],
        dateOfBirth: ['', [Validators.required, Validators.pattern(this.datePattern)]],
        birthCityCode: ['', [Validators.required, Validators.min(11000), 
          Validators.max(40000)]],
        residenceCityCode: ['', [Validators.required, Validators.min(11000),
           Validators.max(40000)]],
        age: [{value: '', disabled: true}]
      }
    );
  }

  isSaveVisible():boolean{
      return this.title === 'Insert Person';
  }

  savePerson(){
    const personToSave:PersonSave = {
      firstName: this.insertForm.get('firstName')?.value,
      lastName: this.insertForm.get('lastName')?.value,
      dOB: this.insertForm.get('dateOfBirth')?.value,
      birthCityCode: this.insertForm.get('birthCityCode')?.value,
      residenceCityCode: this.insertForm.get('residenceCityCode')?.value
    }
    this.personService.savePerson(personToSave).subscribe((savedPerson)=>{
        alert("Person Saved! " + JSON.stringify(savedPerson));
    },
    (error)=> {
      alert("ERROR HAPPENED! " + JSON.stringify(error.error))
    });
  }

  getErrorMessage(control: AbstractControl | null):string {
    let stringResp = '';
    
    if(control?.hasError('required')){
      stringResp = stringResp.concat('This field is required.');
    }
    if(control?.hasError('minlength')){
      stringResp = stringResp.concat('\nMin length is 2.');
    }
    if(control?.hasError('maxlength')){
     stringResp = stringResp.concat('\nMax length is 30.');
    }
    if(control?.hasError('max')){
      stringResp = stringResp.concat('\nMax value is 40000.');
    }
    if(control?.hasError('min')){
      stringResp = stringResp.concat('\nMin value is 11000.');
    }
    if(control?.hasError('pattern')){
      stringResp = stringResp.concat('\nInvalid format.');
    }
    return stringResp;
  }
}