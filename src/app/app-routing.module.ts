import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './person/person-form/person-form.component';  
import { PersonTableComponent } from './person/person-table/person-table.component';  
import { PersonDropdownComponent } from './person/person-dropdown/person-dropdown.component';
import { PersonUpdateComponent } from './person/person-update/person-update.component';

const routes: Routes = [
  {
    path: '',
    component: PersonFormComponent
  },
  {
    path: 'insert',
    component: PersonFormComponent
  },
  {
    path: 'list',
    component: PersonTableComponent
  },
  {
    path: 'delete',
    component: PersonDropdownComponent
  },
  {
    path: 'update',
    component: PersonUpdateComponent
  },
  {
    path: '**',
    component: PersonFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
