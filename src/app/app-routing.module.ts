import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './person/person-form/person-form.component';  
import { PersonTableComponent } from './person/person-table/person-table.component';  
import { PersonDropdownComponent } from './person/person-dropdown/person-dropdown.component';
import { PersonUpdateComponent } from './person/person-update/person-update.component';
import { ViewsComponent } from './views/views.component';
import { StatsComponent } from './stats/stats.component';

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
    path: 'views',
    component: ViewsComponent
  },
  {
    path: 'stats',
    component: StatsComponent
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
