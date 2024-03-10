import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDropdownComponent } from './person-dropdown.component';
import { PersonService } from 'src/app/service/person.service';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { PERSONS, PERSON_UPDATE } from 'src/app/test-data/persons';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PersonTableComponent } from '../person-table/person-table.component';

fdescribe('PersonDeleteComponent', () => {
  let component: PersonDropdownComponent;
  let fixture: ComponentFixture<PersonDropdownComponent>;
  let personServiceSpy: jasmine.SpyObj<PersonService>;
  let el: DebugElement;
  let selectEl: DebugElement;

  beforeEach(() => {
    personServiceSpy = jasmine.createSpyObj('PersonService',
    ['getAllPersons', 'deletePersonById']);
    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));
    personServiceSpy.deletePersonById.and.returnValue(of());

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [PersonDropdownComponent, PersonTableComponent],
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

    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.persons).toEqual(PERSONS);

    expect(personServiceSpy.getAllPersons).toHaveBeenCalledOnceWith();
  });

  it('should render select properly', async () => {
    fixture.detectChanges();

    await fixture.whenStable();

    const options = selectEl.queryAll(By.css('option'));

    expect(options.length).toBe(component.persons.length + 1);
    //dodao sam 1 za default-nu opciju.
  });

  it('should delete person on button click', async () => {
      fixture.detectChanges();
      component.mode = 'brisanje';

      await fixture.whenStable();

      spyOn(window, 'confirm').and.returnValue(true);

      const deleteButton = el.query(By.css('.frm-btn'));
      // selectEl.nativeElement.value = 1 as any as number; TODO: FIX
      component.selectedId = 1;
      fixture.detectChanges();
      deleteButton.nativeElement.click();
      
      await fixture.whenStable();

      expect(personServiceSpy.deletePersonById)
      .toHaveBeenCalledOnceWith(1);
  });
});
