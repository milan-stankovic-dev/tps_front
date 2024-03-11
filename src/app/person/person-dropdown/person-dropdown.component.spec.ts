import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDropdownComponent } from './person-dropdown.component';
import { PersonService } from 'src/app/service/person.service';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { PERSONS, PERSON_UPDATE } from 'src/app/test-data/persons';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonTableComponent } from '../person-table/person-table.component';
import { throwError } from 'rxjs/internal/observable/throwError';
import { PersonFormComponent } from '../person-form/person-form.component';

describe('PersonDeleteComponent', () => {
  let component: PersonDropdownComponent;
  let fixture: ComponentFixture<PersonDropdownComponent>;
  let personServiceSpy: jasmine.SpyObj<PersonService>;
  let el: DebugElement;
  let selectEl: DebugElement;

  beforeEach(() => {
    personServiceSpy = jasmine.createSpyObj('PersonService',
    ['getAllPersons', 'deletePersonById']);
    
    personServiceSpy.deletePersonById.and.returnValue(of());

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [PersonDropdownComponent, PersonTableComponent, PersonFormComponent],
      providers: [{provide: PersonService, 
      useValue: personServiceSpy}]
    });

    fixture = TestBed.createComponent(PersonDropdownComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    selectEl = el.query(By.css('.drop-down'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch api data correctly', async ()=> {
    expect(component.persons).toEqual([]);

    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.persons).toEqual(PERSONS);

    expect(personServiceSpy.getAllPersons).toHaveBeenCalledOnceWith();
  });

  it('error during api data fetching', async () => {
    expect(component.persons).toEqual([]);
  
    personServiceSpy.getAllPersons.and.returnValue(throwError('API malfunctioned.'));
    
    const alertSpy = spyOn(window, 'alert');
    fixture.detectChanges();
  
    await fixture.whenStable();
  
    expect(alertSpy).toHaveBeenCalledWith(
      'DOŠLO JE DO GREŠKE. PROVERITE LOGOVE.');
    expect(personServiceSpy.getAllPersons).toHaveBeenCalled();
    expect(component.persons).toEqual([]);
  });

  it('should render select properly', async () => {
    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
    fixture.detectChanges();

    await fixture.whenStable();

    const options = selectEl.queryAll(By.css('option'));

    expect(options.length).toBe(component.persons.length + 1);
    //dodao sam 1 za default-nu opciju.
  });

  it('should delete person on button click', async () => {
      personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
      fixture.detectChanges();
      component.mode = 'brisanje';

      await fixture.whenStable();

      spyOn(window, 'confirm').and.returnValue(true);
      const alertSpy = spyOn(window, 'alert');

      const deleteButton = el.query(By.css('.frm-btn'));
      // selectEl.nativeElement.value = 1 as any as number; TODO: FIX
      component.selectedId = 1;
      fixture.detectChanges();
      deleteButton.nativeElement.click();
      
      await fixture.whenStable();

      expect(personServiceSpy.deletePersonById)
      .toHaveBeenCalledOnceWith(1);
      await fixture.whenStable();
      // expect(alertSpy).toHaveBeenCalledWith('Brisanje uspešno!');
  });

  it('should fail to delete person on button click', async () => {
    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
    fixture.detectChanges();
    component.mode = 'brisanje';

    await fixture.whenStable();

    const alertSpy = spyOn(window, 'alert');

    const deleteButton = el.query(By.css('.frm-btn'));
    fixture.detectChanges();
    deleteButton.nativeElement.click();
    
    await fixture.whenStable();

    expect(alertSpy).toHaveBeenCalledOnceWith('Morate izabrati osobu za brisanje.');
});
  it('filtering persons by null do nothing', ()=>{
    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
    fixture.detectChanges();

    const filteringResult1 = component.filterPersonsBy(
      undefined, (w, a)=> w == a);
    const filteringResult2 = component.filterPersonsBy(
      undefined, (w, a) => w != a);

    expect(filteringResult1).toEqual(component.persons);
    expect(filteringResult2).toEqual(component.persons);
  });

  it('filtering persons by id equals existing', ()=>{
    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
    fixture.detectChanges();

    const filteringResult = component.filterPersonsBy(
      1, (w, a)=> w == a)[0];

    const expected = PERSONS[0];

    expect(filteringResult).toEqual(expected);
  });

  it('filtering persons by id not equals existing', ()=>{
    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
    fixture.detectChanges();

    const filteringResult = component.filterPersonsBy(
      1, (w, a)=> w != a);

    const expected = PERSONS.slice(1);

    expect(filteringResult).toEqual(expected);
  });

  it('fails to find by id locally', ()=>{
    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
    fixture.detectChanges();

    const resultFindByIdLocally = component.findByIdLocally(5);

    expect(resultFindByIdLocally).toEqual([]);
  });

  it('finds by id locally', ()=>{
    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
    fixture.detectChanges();

    const resultFindByIdLocally = component.findByIdLocally(1)[0];

    expect(resultFindByIdLocally).toEqual(component.persons[0]);
  });

   it('on person updated', async ()=>{
    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
    fixture.detectChanges();

    component.onPersonUpdated(true);
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.persons).toEqual(PERSONS);

    expect(personServiceSpy.getAllPersons).toHaveBeenCalledTimes(2);
   });

   it('modes "brisanje" and "ažuriranje"', () => {
    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
    fixture.detectChanges();
  
    component.mode = 'brisanje';
    component.selectedId = 1;
    fixture.detectChanges();

    const brisanjeEl1 = el.query(By.css('#person-table'));
    expect(brisanjeEl1).toBeTruthy();
    const azuriranjeEl1 = el.query(By.css('#person-insert'));
    expect(azuriranjeEl1).toBeFalsy();
  
    component.mode = 'ažuriranje';
    fixture.detectChanges();

    const azuriranjeEl2 = el.query(By.css('#person-insert'));
    expect(azuriranjeEl2).toBeTruthy();
    const brisanjeEl2 = el.query(By.css('#person-table'));
    expect(brisanjeEl2).toBeFalsy();
    
  });
  
});
