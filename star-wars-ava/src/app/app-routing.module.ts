import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppGuard} from './core/guards/app.guard';
import {DarkSideGuard} from './core/guards/dark-side.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'people',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    // canActivate: [AppGuard]
  },
  {
    path: 'movies',
    loadChildren: () => import('./pages/movies/movies.module').then(m => m.MoviesModule),
    // canActivate: [AppGuard]
  },
  {
    path: 'people',
    loadChildren: () => import('./pages/people/people.module').then(m => m.PeopleModule),
    // canActivate: [AppGuard]
  },
  {
    path: 'dark-side',
    loadChildren: () => import('./pages/dark-side/dark-side.module').then(m => m.DarkSideModule),
    canActivate: [AppGuard],
    canDeactivate: [DarkSideGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
