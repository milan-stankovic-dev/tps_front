import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, throwError } from 'rxjs';
import { PersonStatsService } from 'src/app/service/person-stats.service';
import { By } from '@angular/platform-browser';

fdescribe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let el: DebugElement;
  let personStatsService: PersonStatsService;
  let inputElements: DebugElement[];
  let personStatsServiceSpy: jasmine.SpyObj<PersonStatsService>;

  beforeEach(waitForAsync(() => {
    personStatsServiceSpy = jasmine.createSpyObj('PersonStatsService', 
        ['getMaxHeightCm', 'getAverageAgeYears']);
    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [StatsComponent],
      providers: [{provide: PersonStatsService,
         useValue: personStatsServiceSpy}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    personStatsService = TestBed.inject(PersonStatsService);
    el = fixture.debugElement;
    inputElements = el.queryAll(By.css('.input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch api data and display max height '
            + ' and average age in years', ()=> {
      expect(component.maxHeightCm).toBe(null);
      expect(component.averageAgeYears).toBe(null);

      personStatsServiceSpy.getMaxHeightCm.and.returnValue(of(190));
      personStatsServiceSpy.getAverageAgeYears.and.returnValue(of(27.5));

      fixture.detectChanges();

      expect(personStatsService.getMaxHeightCm).toHaveBeenCalledOnceWith();
      expect(personStatsService.getAverageAgeYears).toHaveBeenCalledOnceWith();

      fixture.whenStable().then(()=>{
        expect(component.maxHeightCm).toBe(190);
        expect(component.averageAgeYears).toBe(27.5);
      });

      expect(inputElements.length).toBe(2);
      expect((inputElements[0].nativeElement as HTMLInputElement)
            .value).toBe('27.5');
      expect((inputElements[1].nativeElement as HTMLInputElement)
            .value).toBe('190');
  });
  it('should error while fetching maxHeight.', async ()=> {
      expect(component.maxHeightCm).toBe(null);
      expect(component.averageAgeYears).toBe(null);

      const alertSpy = spyOn(window, 'alert');
      const loggerSpy = spyOn(console, 'log');
      personStatsServiceSpy.getMaxHeightCm.and
      .returnValue(throwError({error: 'Cannot get max height in cm.'}));
      personStatsServiceSpy.getAverageAgeYears.and.returnValue(of(27.5));

      fixture.detectChanges();

      expect(personStatsService.getMaxHeightCm).toHaveBeenCalledOnceWith();
      expect(personStatsService.getAverageAgeYears).toHaveBeenCalledOnceWith();

      await fixture.whenStable();
        expect(alertSpy).toHaveBeenCalledWith('GREŠKA Cannot get max height in cm.');
  });

  it('should error while fetching averageAgeYears.', async ()=> {
    expect(component.maxHeightCm).toBe(null);
    expect(component.averageAgeYears).toBe(null);

    const alertSpy = spyOn(window, 'alert');
    personStatsServiceSpy.getMaxHeightCm.and.returnValue(of(190));
    personStatsServiceSpy.getAverageAgeYears.and
    .returnValue(throwError({error: 'Cannot get average age years.'}));

    fixture.detectChanges();

    expect(personStatsService.getMaxHeightCm).toHaveBeenCalledOnceWith();
    expect(personStatsService.getAverageAgeYears).toHaveBeenCalledOnceWith();

    await fixture.whenStable();
      expect(alertSpy).toHaveBeenCalledWith('GREŠKA Cannot get average age years.');
});
});
