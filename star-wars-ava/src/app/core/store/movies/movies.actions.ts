import {Action} from '@ngrx/store';
import {MovieModel} from '../../../shared/models/movie.model';
import {PaginationWrapper} from '../../../shared/models/pagination-wrapper';

export enum MoviesActionTypes {
  GetMovies = '[Movies] Get Movies',
  GetMoviesSuccess = '[Movies] Get Movies Success',
  GetMoviesError = '[Movies] Get Movies Error',

  GetMovie = '[Movies] Get Movie',
  GetMovieSuccess = '[Movies] Get Movie Success',
  GetMovieError = '[Movies] Get Movie Error',
}


export class GetMoviesAction implements Action {
  readonly type = MoviesActionTypes.GetMovies;


}

export class GetMoviesSuccessAction implements Action {
  readonly type = MoviesActionTypes.GetMoviesSuccess;

  constructor(public payload: PaginationWrapper<MovieModel> ) {
  }
}

export class GetMoviesErrorAction implements Action {
  readonly type = MoviesActionTypes.GetMoviesError;

  constructor(public payload: Error) {
  }
}


export class GetMovieAction implements Action {
  readonly type = MoviesActionTypes.GetMovie;

  constructor(public payload: { id: string }) {
  }

}

export class GetMovieSuccessAction implements Action {
  readonly type = MoviesActionTypes.GetMovieSuccess;

  constructor(public payload: { movie: MovieModel }) {
  }
}

export class GetMovieErrorAction implements Action {
  readonly type = MoviesActionTypes.GetMovieError;

  constructor(public payload: Error) {
  }
}


export type MoviesActions = GetMoviesAction | GetMoviesSuccessAction | GetMoviesErrorAction
  | GetMovieAction | GetMovieSuccessAction | GetMovieErrorAction;

