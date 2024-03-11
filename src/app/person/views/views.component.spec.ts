import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsComponent } from './views.component';
import { PersonViewService } from 'src/app/service/person-view.service';
import { DebugElement } from '@angular/core';
import { PersonTableComponent } from '../person-table/person-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PersonDisplay } from 'src/app/domain/PersonDisplay';
import { ADULTS, SMEDEREVCI } from 'src/app/test-data/persons';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';

fdescribe('ViewsComponent', () => {
  let component: ViewsComponent;
  let fixture: ComponentFixture<ViewsComponent>;
  let personViewServiceSpy: jasmine.SpyObj<PersonViewService>;
  let el: DebugElement;

  beforeEach(() => {
    personViewServiceSpy = jasmine.createSpyObj('PersonViewService',
    ['getAllSmederevci', 'getAllAdults']);
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ViewsComponent, PersonTableComponent],
      providers: [{provide: PersonViewService, 
        useValue: personViewServiceSpy}]
    });

    fixture = TestBed.createComponent(ViewsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch api data and display views properly.', async ()=> {
    personViewServiceSpy.getAllSmederevci.and.returnValue(of(SMEDEREVCI));
    personViewServiceSpy.getAllAdults.and.returnValue(of(ADULTS));
      
    fixture.detectChanges();

        await fixture.whenStable();
        expect(component.smederevci).toBe(SMEDEREVCI);
        expect(component.adults).toBe(ADULTS);

        const smederevciTable = el.query(By.css('#smederevciTable'));
        const adultsTable = el.query(By.css('#adultsTable'));
        
        expect(smederevciTable).toBeTruthy();
        expect(adultsTable).toBeTruthy();

  });

  it('should fail to fetch adults', async ()=> {
    const alertSpy = spyOn(window, 'alert');
    
    personViewServiceSpy.getAllSmederevci.and.returnValue(of(SMEDEREVCI));
    personViewServiceSpy.getAllAdults.and.returnValue(throwError(
      {error: 'Cannot get adults.'}));

    fixture.detectChanges();
    
    expect(personViewServiceSpy.getAllAdults).toHaveBeenCalledWith();
    expect(personViewServiceSpy.getAllSmederevci).toHaveBeenCalledWith();

    await fixture.whenStable();
    expect(alertSpy).toHaveBeenCalledWith('GREŠKA Cannot get adults.');
    });

    it('should fail to fetch Smederevci', async ()=> {
      const alertSpy = spyOn(window, 'alert');
      
      personViewServiceSpy.getAllSmederevci.and.returnValue(throwError(
        {error: 'Cannot get Smederevci.'}));
      personViewServiceSpy.getAllAdults.and.returnValue(of(ADULTS));
  
      fixture.detectChanges();
      
      expect(personViewServiceSpy.getAllAdults).toHaveBeenCalledWith();
      expect(personViewServiceSpy.getAllSmederevci).toHaveBeenCalledWith();
  
      await fixture.whenStable();
      expect(alertSpy).toHaveBeenCalledWith('GREŠKA Cannot get Smederevci.');
      });
});
