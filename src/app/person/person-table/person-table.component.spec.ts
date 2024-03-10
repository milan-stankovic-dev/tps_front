import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTableComponent } from './person-table.component';
import { PersonService } from 'src/app/service/person.service';
import { DebugElement } from '@angular/core';
import { PERSONS } from 'src/app/test-data/persons';
import { of } from 'rxjs/internal/observable/of';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

fdescribe('PersonListComponent', () => {
  let component: PersonTableComponent;
  let fixture: ComponentFixture<PersonTableComponent>;
  let personServiceSpy: jasmine.SpyObj<PersonService>;
  let el: DebugElement;

  beforeEach(() => {
    personServiceSpy = jasmine.createSpyObj('PersonService',
    ['getAllPersons']);
    personServiceSpy.getAllPersons.and.returnValue(of(PERSONS));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [PersonTableComponent],
      providers: [{provide: PersonService,
      useValue: personServiceSpy}]
    });

    fixture = TestBed.createComponent(PersonTableComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch api data and display it', async ()=> {
    expect(component.persons).toEqual([]);
    expect(component.filteredPersons).toEqual([]);

    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.persons).toEqual(PERSONS);

    expect(personServiceSpy.getAllPersons).toHaveBeenCalledOnceWith();
    const tableRows = el.queryAll(By.css('tbody tr'));

    expect(tableRows.length)
      .toEqual(PERSONS.length);

    for(let i = 0; i< tableRows.length; i++){
      const row = tableRows[i].nativeElement;
      const person = component.filteredPersons[i];

      expect(row.textContent).toContain(person.firstName);
      expect(row.textContent).toContain(person.lastName);
    }
  });
  it('filtering works', async()=>{
      //TODO
  });
});
