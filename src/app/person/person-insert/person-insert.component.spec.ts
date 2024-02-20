import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInsertComponent } from './person-insert.component';

describe('PersonInsertComponent', () => {
  let component: PersonInsertComponent;
  let fixture: ComponentFixture<PersonInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonInsertComponent]
    });
    fixture = TestBed.createComponent(PersonInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});