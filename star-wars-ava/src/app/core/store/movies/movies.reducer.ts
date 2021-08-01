import {MovieModel} from '../../../shared/models/movie.model';
import {MoviesActions, MoviesActionTypes} from './movies.actions';
import {SpeciesActionTypes} from '../species/species.actions';
import {SpecieModel} from '../../../shared/models/specie.model';


export const boardsFeatureKey = 'movies';

export interface MoviesState {
  data: MovieModel[];
  action: string;
}

export const initialState: MoviesState = {
  data: [],
  action: null,
};

export function moviesReducer(state = initialState, action: MoviesActions): MoviesState {
  switch (action.type) {
    case MoviesActionTypes.GetMoviesSuccess :
      // pages that are cached
      return {
        ...state,
        action: MoviesActionTypes.GetMoviesSuccess,
        data: action.payload.results
      };
    case MoviesActionTypes.GetMovieSuccess :
      const replaceSpeciesIndex = state.data.findIndex((film: MovieModel) => film.url === action.payload.movie.url);
      let newData;
      if (replaceSpeciesIndex > -1) {
        newData = [...state.data];
        newData[replaceSpeciesIndex] = action.payload.movie;
      } else {
        newData = [...state.data, action.payload.movie];
      }
      return {
        ...state,
        data: newData,
      };
    default:
      return state;
  }

}
