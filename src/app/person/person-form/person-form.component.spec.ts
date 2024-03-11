import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormComponent } from './person-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PERSON_UPDATE } from 'src/app/test-data/persons';
import { PersonService } from 'src/app/service/person.service';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs';

describe('PersonInsertComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;
  let el: DebugElement;
  let formComponent: DebugElement;
  let personServiceSpy: jasmine.SpyObj<PersonService>;

  beforeEach(() => {
    personServiceSpy = jasmine.createSpyObj('PersonService',
        ['updatePerson', 'savePerson']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [PersonFormComponent]
    });
    fixture = TestBed.createComponent(PersonFormComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    formComponent = el.query(By.css('#form'));
    expect(formComponent).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate form with default values Insert', () => {
    component.title = 'Unesite Osobu';
    expect(component.insertForm.value).toEqual({
      firstName: '',
      lastName: '',
      heightInCm: '',
      dateOfBirth: '',
      birthCityCode: '',
      residenceCityCode: ''
    });
  });

  it('should calculate age if possible, not possible',() => {
    const ageCalculated1: number = component
    .calculateAgeIfPossible();

    const dobInputEl = formComponent.query(
      By.css('#input-dob'));
    expect(dobInputEl).toBeTruthy();

    dobInputEl.nativeElement.value = 'invalid value';

    dobInputEl.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const ageCalculated2: number = component
    .calculateAgeIfPossible();

    expect(ageCalculated2).toBeFalsy();
    expect(ageCalculated2).toEqual(NaN);
  });

  it('should calculate age if possible, possible',() => {
    const ageCalculated1: number = component
    .calculateAgeIfPossible();
    
    const dobInputEl = formComponent.query(
      By.css('#input-dob'));
    expect(dobInputEl).toBeTruthy();

    dobInputEl.nativeElement.value = '2000-01-01';

    dobInputEl.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const ageCalculated2: number = component
    .calculateAgeIfPossible();

    expect(ageCalculated2).toBeTruthy();
    expect(ageCalculated2).toBeGreaterThanOrEqual(290);
  });

  it('should display "save"', ()=> {
    component.title = 'Unesite Osobu';
    fixture.detectChanges();

    const btnSaveEl = el.query(By.css('#btn-save'));
    expect(btnSaveEl).toBeTruthy();

    const shouldSeeSave: boolean = 
    component.isSaveVisible();

    expect(shouldSeeSave).toBeTrue();
  });

  it('should display "update"', ()=> {
    component.title = 'Ažuriraj Osobu';
    fixture.detectChanges();

    const btnUpdateEl = el.query(By.css('#btn-update'));
    expect(btnUpdateEl).toBeTruthy();

    const shouldSeeSave: boolean = 
    component.isSaveVisible();

    expect(shouldSeeSave).toBeFalse();
  });

  it('should return error messages for'
  +' different validation cases first name', ()=> {
    
    const firstNameInputEl = formComponent.query(
      By.css('#first-name-input'));
    expect(firstNameInputEl).toBeTruthy();
    
    const formFirstName = component.insertForm.get('firstName');
    expect(formFirstName).toBeTruthy();
    formFirstName?.setValue('');

    fixture.detectChanges();

    const errorMessageResult1: string = 
    component.getErrorMessage(formFirstName!);

    expect(errorMessageResult1).toBeTruthy();
    expect(errorMessageResult1).toContain('Ovo polje je obavezno.');

    formFirstName?.setValue(' ');

    fixture.detectChanges();

    const errorMessageResult2: string = 
      component.getErrorMessage(formFirstName!);

    expect(errorMessageResult2).toBeTruthy();
    expect(errorMessageResult2).toContain('Pogrešan format.');
    expect(errorMessageResult2).toContain('Minimalna dužina je 2.');

    formFirstName?.setValue('Testttttttttttttttttttttttttttttttt');

    fixture.detectChanges();

    const errorMessageResult3: string = 
      component.getErrorMessage(formFirstName!);

    expect(errorMessageResult3).toBeTruthy();
    expect(errorMessageResult3).toContain('Maksimalna dužina je 30.');

    formFirstName?.setValue('Petar');

    fixture.detectChanges();

    const errorMessageResult4: string = 
      component.getErrorMessage(formFirstName!);

    expect(errorMessageResult4).toBeFalsy();
  });

  it('should return error messages for'
  +' different validation cases last name', ()=> {
    
    const lastNameInputEl = formComponent.query(
      By.css('#last-name-input'));
    expect(lastNameInputEl).toBeTruthy();
    
    const formLastName = component.insertForm.get('lastName');
    expect(formLastName).toBeTruthy();

    formLastName?.setValue(' ');

    fixture.detectChanges();

    const errorMessageResult1: string = 
      component.getErrorMessage(formLastName!);

    expect(errorMessageResult1).toBeTruthy();
    expect(errorMessageResult1).toContain('Pogrešan format.');
    expect(errorMessageResult1).toContain('Minimalna dužina je 2.');

    formLastName?.setValue('Testttttttttttttttttttttttttttttttt');

    fixture.detectChanges();

    const errorMessageResult2: string = 
      component.getErrorMessage(formLastName!);

    expect(errorMessageResult2).toBeTruthy();
    expect(errorMessageResult2).toContain('Maksimalna dužina je 30.');

    formLastName?.setValue('Petar');

    fixture.detectChanges();

    const errorMessageResult3: string = 
      component.getErrorMessage(formLastName!);

    expect(errorMessageResult3).toBeFalsy();
  });

  it('should return error messages for'
  +' different validation cases dob', ()=> {
    
    const dobInputEl = formComponent.query(
      By.css('#input-dob'));
    expect(dobInputEl).toBeTruthy();
    
    const formDob = component.insertForm.get('dateOfBirth');
    expect(formDob).toBeTruthy();

    formDob?.setValue(' ');

    fixture.detectChanges();

    const errorMessageResult1: string = 
      component.getErrorMessage(formDob!);

    expect(errorMessageResult1).toBeTruthy();
    expect(errorMessageResult1).toContain('Pogrešan format.');

    formDob?.setValue('1999-02-12');

    fixture.detectChanges();

    const errorMessageResult3: string = 
      component.getErrorMessage(formDob!);

    expect(errorMessageResult3).toBeFalsy();
  });

  it('should return error messages for'
  +' different validation cases height in cm', ()=> {
    
    const heightInputEl = formComponent.query(
      By.css('#input-height-in-cm'));
    expect(heightInputEl).toBeTruthy();
    
    const formHeight = component.insertForm.get('heightInCm');
    expect(formHeight).toBeTruthy();

    formHeight?.setValue(20);

    fixture.detectChanges();

    const errorMessageResult1: string = 
      component.getErrorMessage(formHeight!);

    expect(errorMessageResult1).toBeTruthy();
    expect(errorMessageResult1).toContain('Minimalna vrednost je prekoračena.');

    formHeight?.setValue('10000');

    fixture.detectChanges();

    const errorMessageResult2: string = 
      component.getErrorMessage(formHeight!);
    
    expect(errorMessageResult2).toBeTruthy();
    expect(errorMessageResult2).toContain('Maksimalna vrednost prekoračena.');

    formHeight?.setValue('175');

    fixture.detectChanges();

    const errorMessageResult3: string = 
      component.getErrorMessage(formHeight!);
    
    expect(errorMessageResult3).toBeFalsy();
  });

  it('should return error messages for'
  +' different validation cases city of birth pptbr', ()=> {
    
    const pptBrInputEl = formComponent.query(
      By.css('#input-ppt-birth'));
    expect(pptBrInputEl).toBeTruthy();
    
    const formPpptBirth = component.insertForm.get('birthCityCode');
    expect(formPpptBirth).toBeTruthy();

    formPpptBirth?.setValue(9000);

    fixture.detectChanges();

    const errorMessageResult1: string = 
      component.getErrorMessage(formPpptBirth!);

    expect(errorMessageResult1).toBeTruthy();
    expect(errorMessageResult1).toContain('Minimalna vrednost je prekoračena.');

    formPpptBirth?.setValue(50000);

    fixture.detectChanges();

    const errorMessageResult2: string = 
      component.getErrorMessage(formPpptBirth!);
    
    expect(errorMessageResult2).toBeTruthy();
    expect(errorMessageResult2).toContain('Maksimalna vrednost prekoračena.');

    formPpptBirth?.setValue(18000);

    fixture.detectChanges();

    const errorMessageResult3: string = 
      component.getErrorMessage(formPpptBirth!);
    
    expect(errorMessageResult3).toBeFalsy();
  });

  it('should return error messages for'
  +' different validation cases city of residence pptbr', ()=> {
    
    const pptBrInputEl = formComponent.query(
      By.css('#input-ppt-residence'));
    expect(pptBrInputEl).toBeTruthy();
    
    const formPpptResidence = component.insertForm.get('residenceCityCode');
    expect(formPpptResidence).toBeTruthy();

    formPpptResidence?.setValue(9000);

    fixture.detectChanges();

    const errorMessageResult1: string = 
      component.getErrorMessage(formPpptResidence!);

    expect(errorMessageResult1).toBeTruthy();
    expect(errorMessageResult1).toContain('Minimalna vrednost je prekoračena.');

    formPpptResidence?.setValue(50000);

    fixture.detectChanges();

    const errorMessageResult2: string = 
      component.getErrorMessage(formPpptResidence!);
    
    expect(errorMessageResult2).toBeTruthy();
    expect(errorMessageResult2).toContain('Maksimalna vrednost prekoračena.');

    formPpptResidence?.setValue(18000);

    fixture.detectChanges();

    const errorMessageResult3: string = 
      component.getErrorMessage(formPpptResidence!);
    
    expect(errorMessageResult3).toBeFalsy();
  });

  it('Should update form with new person', () => {
    const newPersonUpdate = PERSON_UPDATE;
    component.personForUpdate = newPersonUpdate;

    fixture.detectChanges();

    const formFirstName = component.insertForm.get('firstName');
    const formLastName = component.insertForm.get('lastName');
    const formHeight = component.insertForm.get('heightInCm');
    const formDateOfBirth = component.insertForm.get('dateOfBirth');
    const formBirthCityCode = component.insertForm.get('birthCityCode');
    const formResidenceCityCode = component.insertForm.get('residenceCityCode');
    const formAgeInMonths = component.insertForm.get('age');

    expect(formFirstName).toBeTruthy();
    expect(formLastName).toBeTruthy();
    expect(formHeight).toBeTruthy();
    expect(formDateOfBirth).toBeTruthy();
    expect(formBirthCityCode).toBeTruthy();
    expect(formResidenceCityCode).toBeTruthy();
    expect(formAgeInMonths).toBeTruthy();

    expect(formFirstName?.value).toEqual('Sara');
    expect(formLastName?.value).toEqual('Perić');
    expect(formHeight?.value).toEqual(165);
    expect(formDateOfBirth?.value).toEqual(new Date(2002,10,10));
    expect(formBirthCityCode?.value).toEqual(19_000);
    expect(formResidenceCityCode?.value).toEqual(19_000);
  });

  it('Should invoke updatePerson', async () => {
    spyOn(component, 'saveOrUpdatePerson').and.callThrough();
  
    component.updatePerson();
  
    await fixture.whenStable();
  
    expect(component.saveOrUpdatePerson).toHaveBeenCalled();
  });

  it('Should invoke savePerson', async () => {
    spyOn(component, 'saveOrUpdatePerson').and.callThrough();
  
    component.savePerson();
  
    await fixture.whenStable();
  
    expect(component.saveOrUpdatePerson).toHaveBeenCalled();
  });

  it('Should invoke receive positive result from backend', async () => {
    const newPersonUpdate = PERSON_UPDATE;
    component.personForUpdate = newPersonUpdate;

    personServiceSpy.updatePerson.and.returnValue(of(PERSON_UPDATE));

    component.saveOrUpdatePerson(personServiceSpy.updatePerson);
    
    fixture.detectChanges();
    await fixture.whenStable();
  
    expect(personServiceSpy.updatePerson).toHaveBeenCalledOnceWith(PERSON_UPDATE);
  });

  it('Should invoke receive negative result from backend', async () => {
    const newPersonUpdate = PERSON_UPDATE;
    component.personForUpdate = newPersonUpdate;

    const alertSpy = spyOn(window, 'alert');
    personServiceSpy.updatePerson.and.returnValue(throwError(
      {error: 'Cannot update person'}));

    component.saveOrUpdatePerson(personServiceSpy.updatePerson);
    
    fixture.detectChanges();
    await fixture.whenStable();
  
    expect(alertSpy).toHaveBeenCalledOnceWith(
      'DOŠLO JE DO GREŠKE! "Cannot update person"');
  });
  
});
