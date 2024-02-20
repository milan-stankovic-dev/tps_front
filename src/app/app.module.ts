import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonInsertComponent } from './person-insert/person-insert.component';
import { PersonListComponent } from './person-list/person-list.component';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PersonDeleteComponent } from './person-delete/person-delete.component';
import { PersonUpdateComponent } from './person-update/person-update.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonInsertComponent,
    PersonListComponent,
    HeaderComponent,
    PersonDeleteComponent,
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
