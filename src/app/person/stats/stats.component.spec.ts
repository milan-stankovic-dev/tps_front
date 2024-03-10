import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
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
    personStatsServiceSpy.getMaxHeightCm.and.returnValue(of(190));
    personStatsServiceSpy.getAverageAgeYears.and.returnValue(of(27.5));

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
});
