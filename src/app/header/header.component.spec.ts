import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain all anchors', () => {
      const links = el.queryAll(By.css('.menu-item'));
      expect(links.length).toBe(6);

      const expectedRouterLinks = ['/insert', '/list', 
      '/delete', '/update', '/views', '/stats'];

      links.forEach((link, index) => {
        const routerLink = link.nativeElement.getAttribute('routerLink');
        expect(routerLink).toBe(expectedRouterLinks[index]);
      });
  });
});
