import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonFormComponent } from './person/person-form/person-form.component';
import { PersonTableComponent } from './person/person-table/person-table.component'; 
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PersonDropdownComponent } from './person/person-dropdown/person-dropdown.component';
import { PersonUpdateComponent } from './person/person-update/person-update.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonFormComponent,
    PersonTableComponent,
    HeaderComponent,
    PersonDropdownComponent,
    PersonUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
