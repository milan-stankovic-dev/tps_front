import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonUpdateComponent } from './person-update.component';
import { PersonDropdownComponent } from '../person-dropdown/person-dropdown.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PersonService } from 'src/app/service/person.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

fdescribe('PersonUpdateComponent', () => {
  let component: PersonUpdateComponent;
  let fixture: ComponentFixture<PersonUpdateComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonUpdateComponent, PersonDropdownComponent],
      imports: [HttpClientTestingModule, FormsModule]
    });

    fixture = TestBed.createComponent(PersonUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have app-person-dropdown with mode "ažuriranje"', () => {
    const dropdownEl = el.queryAll(By.directive(
          PersonDropdownComponent))[0];
    expect(dropdownEl).toBeTruthy();
    
    const dropdownComponent = dropdownEl.componentInstance as PersonDropdownComponent;
    expect(dropdownComponent.mode).toEqual('ažuriranje');
  });
});
