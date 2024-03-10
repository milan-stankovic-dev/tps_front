import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from "@angular/core/testing";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "./app-routing.module";
import { PersonFormComponent } from "./person/person-form/person-form.component";
import { PersonDropdownComponent } from "./person/person-dropdown/person-dropdown.component";
import { PersonTableComponent } from "./person/person-table/person-table.component";
import { PersonUpdateComponent } from "./person/person-update/person-update.component";
import { ViewsComponent } from "./person/views/views.component";
import { StatsComponent } from "./person/stats/stats.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

fdescribe('App routing module', () => {
    let router: Router;
    let fixture: ComponentFixture<HeaderComponent>;
    let appFixture :ComponentFixture<AppComponent>;
    let location: Location;
    let el: DebugElement;
    let links: DebugElement[];

    beforeEach(waitForAsync(()=>{
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [PersonFormComponent, PersonDropdownComponent, 
            PersonTableComponent, PersonUpdateComponent, ViewsComponent,
            StatsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        router.initialNavigation();
        fixture = TestBed.createComponent(HeaderComponent);
        appFixture = TestBed.createComponent(AppComponent);
        el = fixture.debugElement;
        links = el.queryAll(By.css('.menu-item'));
        appFixture.detectChanges();
    });

    it('Should navigate to insert with PersonFormComponent.', async () => {
        // appFixture.detectChanges();
        links[0].nativeElement.click();
      
        await appFixture.whenStable();
        expect(location.path()).toBe('/');
        
        async () => {
            await fixture.whenStable();
            const componentDisplayed = appFixture
                .debugElement.query(By.directive(PersonFormComponent));

            expect(componentDisplayed).toBeTruthy();    
        }
      });

      it('Should navigate to list with PersonTableComponent.', async () => {
        router.navigate(['/list']);
        // links[1].nativeElement.click();

        await appFixture.whenStable();
    
        appFixture.detectChanges();
    
        expect(location.path()).toBe('/list');

        async() => {
        await fixture.whenStable();
        const componentDisplayed = appFixture.debugElement.query(By.directive(PersonTableComponent));
    
        expect(componentDisplayed).toBeTruthy();
        }
    });

    it('Should navigate to delete with PersonDropdownComponent.', async () => {
        router.navigate(['/delete']);

        await appFixture.whenStable();
    
        appFixture.detectChanges();
    
        expect(location.path()).toBe('/delete');

        async() => {
        await fixture.whenStable();
        const componentDisplayed = appFixture.debugElement.query(By.directive(PersonDropdownComponent));
    
        expect(componentDisplayed).toBeTruthy();
        }
    });

    it('Should navigate to update with PersonDropdownComponent.', async () => {
        router.navigate(['/update']);

        await appFixture.whenStable();
    
        appFixture.detectChanges();
    
        expect(location.path()).toBe('/update');

        async() => {
        await fixture.whenStable();
        const componentDisplayed = appFixture.debugElement.query(By.directive(PersonDropdownComponent));
        expect(componentDisplayed).toBeTruthy();
        }
    });

    it('Should navigate to views with ViewsComponent.', async () => {
        router.navigate(['/views']);

        await appFixture.whenStable();
    
        appFixture.detectChanges();
    
        expect(location.path()).toBe('/views');

        async() => {
        await fixture.whenStable();
        const componentDisplayed = appFixture.debugElement.query(By.directive(ViewsComponent));
    
        expect(componentDisplayed).toBeTruthy();
        }
    });

    it('Should navigate to stats with StatsComponent.', async () => {
        router.navigate(['/stats']);

        await appFixture.whenStable();
    
        appFixture.detectChanges();
    
        expect(location.path()).toBe('/stats');

        async() => {
        await fixture.whenStable();
        const componentDisplayed = appFixture.debugElement.query(By.directive(StatsComponent));
    
        expect(componentDisplayed).toBeTruthy();
        }
    });
    
});

