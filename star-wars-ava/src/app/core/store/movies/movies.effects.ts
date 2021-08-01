import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {MoviesApiService} from '../../api/movies-api.service';
import {
  GetMovieAction,
  GetMovieErrorAction,
  GetMoviesAction,
  GetMoviesErrorAction,
  GetMoviesSuccessAction,
  GetMovieSuccessAction,
  MoviesActionTypes
} from './movies.actions';
import {Action} from '@ngrx/store';


@Injectable()
export class MoviesEffects {


  constructor(private actions$: Actions, private moviesService: MoviesApiService) {
  }

  @Effect()
  getAllMovies$: Observable<Action> = this.actions$.pipe(
    ofType<GetMoviesAction>(MoviesActionTypes.GetMovies),
    mergeMap(action => this.moviesService.getAll()),
    map(movies => new GetMoviesSuccessAction(movies)),
    catchError((err) => [new GetMoviesErrorAction(err)])
  );

  @Effect()
  getMovie$: Observable<Action> = this.actions$.pipe(
    ofType<GetMovieAction>(MoviesActionTypes.GetMovie),
    map((action: GetMovieAction) => action.payload.id),
    mergeMap(action => this.moviesService.getById(action).pipe(map((movie => {
      return {movie};
    })))),
    map(movie => new GetMovieSuccessAction(movie)),
    catchError((err) => [new GetMovieErrorAction(err)])
  );

}
