import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonInsertComponent } from './person-insert/person-insert.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonDeleteComponent } from './person-delete/person-delete.component';
import { PersonUpdateComponent } from './person-update/person-update.component';

const routes: Routes = [
  {
    path: '',
    component: PersonInsertComponent
  },
  {
    path: 'insert',
    component: PersonInsertComponent
  },
  {
    path: 'list',
    component: PersonListComponent
  },
  {
    path: 'delete',
    component: PersonDeleteComponent
  },
  {
    path: 'update',
    component: PersonUpdateComponent
  },
  {
    path: '**',
    component: PersonInsertComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
