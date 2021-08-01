import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardsRoutingModule} from './movies-routing.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {ReactiveFormsModule} from '@angular/forms';
import {moviesReducer} from '../../core/store/movies/movies.reducer';
import {MoviesEffects} from '../../core/store/movies/movies.effects';
import { MoviesComponent } from './components/movies/movies.component';


@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    CardsRoutingModule,
  ],
  providers: []
})
export class MoviesModule {
}
