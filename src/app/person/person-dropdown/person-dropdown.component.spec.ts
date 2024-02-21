import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDropdownComponent } from './person-dropdown.component';

describe('PersonDeleteComponent', () => {
  let component: PersonDropdownComponent;
  let fixture: ComponentFixture<PersonDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonDropdownComponent]
    });
    fixture = TestBed.createComponent(PersonDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
