import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../../../../NH_Tea/nh_tea/src/environments/environment';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {moviesReducer, MoviesState} from '../core/store/movies/movies.reducer';
import {speciesReducer, SpeciesState} from '../core/store/species/species.reducer';
import {starshipsReducer, StarshipState} from '../core/store/starships/starships.reducer';


export interface AppState {
  router: RouterReducerState<any>;
  movies: MoviesState;
  species: SpeciesState;
  starships: StarshipState
}


export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  species: speciesReducer,
  starships: starshipsReducer,
  movies: moviesReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
