import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DebugElement } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';

fdescribe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [RouterOutlet],
      declarations: [AppComponent, HeaderComponent]
    });
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should have header and router', () => {
    const headerElement = el.query(By.directive(HeaderComponent));
    const routerElement = el.query(By.css('router-outlet'));

    expect(headerElement).toBeTruthy();
    expect(routerElement).toBeTruthy();

    expect(headerElement.componentInstance instanceof HeaderComponent)
        .toBeTruthy();
    expect(routerElement.nativeElement.tagName.toLowerCase())
        .toBe('router-outlet');
  });
});
