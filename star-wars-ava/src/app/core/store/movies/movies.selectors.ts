import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MoviesState} from './movies.reducer';
import {MovieModel} from '../../../shared/models/movie.model';

export const getMoviesState = createFeatureSelector<MoviesState>('movies');

export const selectAllMovies = createSelector(getMoviesState, (state: MoviesState) => state.data);

export const getMoviesById = (id) =>
  createSelector(getMoviesState, state => {
    const foundFilm = state.data ? state.data.find(film => film.url === id) : null;
    return foundFilm ? foundFilm : null;
  });
export const selectMovieCharacters = (id) => createSelector(getMoviesById(id), (state: MovieModel) => state ? state.characters : []);
