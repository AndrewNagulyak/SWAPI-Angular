import {Injectable} from '@angular/core';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MovieModel} from '../../shared/models/movie.model';
import {GetMoviesAction} from '../store/movies/movies.actions';
import {getMoviesState} from '../store/movies/movies.selectors';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private store: Store<AppState>) {

  }

  getAllMovies(): Observable<MovieModel[]> {
    return this.store.pipe(select(getMoviesState), tap(movieState => {
      // init people
      if (!movieState.action) {
        this.store.dispatch(new GetMoviesAction());
      }
    }), map(movieState => movieState.data), filter(movies => movies !== null));
  }
}
