import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonDetailsComponent} from './components/person-detail/person-details.component';
import {PeoplePageComponent} from './components/people-page/people-page.component';
import {PersonDetailsResolver} from './services/person-details.resolver';


const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PeoplePageComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: PersonDetailsComponent,
    resolve: {
      person: PersonDetailsResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PeoplesRoutingModule {
}
