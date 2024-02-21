import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonSave } from 'src/app/domain/PersonSave';
import { PersonService } from 'src/app/service/person.service';
import { DATE_PATTERN, NAME_PATTERN } from '../../pattern/regexPatterns';
import { Observable, distinctUntilChanged } from 'rxjs';
import { calculateAgeInMonths } from 'src/app/utility/personUtility';

@Component({
  selector: 'app-person-insert',
  templateUrl: './person-insert.component.html',
  styleUrls: ['./person-insert.component.css', 
  '../../../styles.css']
})
export class PersonInsertComponent {
  @Input() title = 'Insert Person';
  insertForm: FormGroup;
  datePattern: RegExp = DATE_PATTERN;
  namePattern: RegExp = NAME_PATTERN; 
  // calculateAge: Function = calculateAgeInMonths;
  @Output() updated: EventEmitter<boolean> = 
    new EventEmitter<boolean>();

  private displayedPerson: PersonSave | undefined;

  @Input()
  set personForUpdate(value: PersonSave | undefined){
    if (value && JSON.stringify(value)
     !== JSON.stringify(this.displayedPerson)) {

      this.displayedPerson = { ...value};
      this.updateFormWithNewPerson(value);
      console.log("Updated person");
    }

  }

  calculateAgeIfPossible():number {
    const dateInputted = this.insertForm
                          .get('dateOfBirth')?.value;
    if(DATE_PATTERN.test(dateInputted)){
      return calculateAgeInMonths(dateInputted);
    }

    return NaN;
  }

  constructor(private fb: FormBuilder,
               private personService: PersonService){
    this.insertForm = this.fb.group(
      {
        id: [{ value: '', disabled: true }],
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

  updateFormWithNewPerson(person: PersonSave | undefined): void {
    if (person) {
      this.insertForm.setValue({
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        dateOfBirth: person.dOB,
        birthCityCode: person.birthCityCode,
        residenceCityCode: person.residenceCityCode,
        age: ''
      });
      console.log("Updated form with new person")
    }
  }

  isSaveVisible():boolean{
      return this.title === 'Insert Person';
  }

  saveOrUpdatePerson(apiCallFunction: (p: PersonSave) => Observable<PersonSave>) {
      const personToSave: PersonSave = {
      id: this.insertForm.get('id')!.value,
      firstName: this.insertForm.get('firstName')!.value,
      lastName: this.insertForm.get('lastName')!.value,
      dOB: this.insertForm.get('dateOfBirth')!.value,
      birthCityCode: this.insertForm.get('birthCityCode')!.value,
      residenceCityCode: this.insertForm.get('residenceCityCode')!.value
    };

    apiCallFunction.bind(this.personService)(personToSave).subscribe(
      (savedPerson) => {
        alert("Person Saved! " + JSON.stringify(savedPerson));
        this.updated.emit(true);
      },
      (error) => {
        alert("ERROR HAPPENED! " + JSON.stringify(error.error));
      }
    );
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

  updatePerson():void {
    this.saveOrUpdatePerson(this.personService.updatePerson);
  }

  savePerson():void{
    this.saveOrUpdatePerson(this.personService.savePerson);
  }
}