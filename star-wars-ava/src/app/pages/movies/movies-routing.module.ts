import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MoviesComponent} from './components/movies/movies.component';

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MoviesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CardsRoutingModule {

}
